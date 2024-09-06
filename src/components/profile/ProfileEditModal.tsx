/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@/components/Modal';
import Confirm from '@/components/Confirm';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { IUserData, IUserInformation } from '@/types/userTypes';
import ProfileImageModal from './ProfileImageModal';
import NicknameModal from './NicknameModal';
import PasswordChangeModal from './PasswordChangeModal';
import MainProfileContent from './MainProfileContent';

const ProfileEditModal: React.FC = () => {
  const [currentModal, setCurrentModal] = useState<
    'main' | 'profileImage' | 'nickname' | 'password'
  >('main');
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const modals = useModalStore((state) => state.modals);
  const closeModal = useModalStore((state) => state.closeModal);
  const setUser = useUserStore((state) => state.setUser);
  const userInformation: IUserData = useUserStore((state) => state.userInformation);
  const { profileImage, nickname, userId } = userInformation;
  const [newProfileImage, setNewProfileImage] = useState<string>(profileImage);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [newPassword, setNewPassword] = useState<string>('');

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/profileEdit/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileImage: newProfileImage,
          password: newPassword,
          userName: newNickname,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const result = await response.json();
      if (result.success) {
        const updatedUser: IUserData = {
          ...userInformation,
          password: newPassword || userInformation.password,
          profileImage: newProfileImage,
          nickname: newNickname,
        };
        setUser(updatedUser);

        const userInfoForStorage: IUserInformation = {
          userId,
          profileImage: newProfileImage,
          nickname: newNickname,
          password: newPassword || userInformation.password,
        };
        localStorage.setItem('userInformation', JSON.stringify(userInfoForStorage));

        closeModal('profileEdit');
        toast.success('프로필이 성공적으로 업데이트되었습니다.');
      } else {
        console.error(result.message);
        toast.error('프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('프로필 업데이트 중 오류가 발생했습니다.');
    }
    setShowConfirm(false);
    setIsModalVisible(true);
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
    setIsModalVisible(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setIsModalVisible(false);
  };

  const renderModalContent = () => {
    switch (currentModal) {
      case 'profileImage':
        return (
          <ProfileImageModal
            onBack={() => setCurrentModal('main')}
            profileimage={newProfileImage}
            setNewProfileImage={setNewProfileImage}
          />
        );
      case 'nickname':
        return (
          <NicknameModal
            onBack={() => setCurrentModal('main')}
            nickname={newNickname}
            setNewNickname={setNewNickname}
          />
        );
      case 'password':
        return (
          <PasswordChangeModal
            onBack={() => setCurrentModal('main')}
            onPasswordChange={(password) => setNewPassword(password)}
          />
        );
      default:
        return (
          <MainProfileContent
            newProfileImage={newProfileImage}
            newNickname={newNickname}
            userId={userId}
            setCurrentModal={setCurrentModal}
            handleShowConfirm={handleShowConfirm}
          />
        );
    }
  };

  return (
    <>
      {modals.modalName === 'profileEdit' && modals.modalState && (
        <>
          {isModalVisible && (
            <Modal modalName="profileEdit">
              <div css={modalContentStyle}>{renderModalContent()}</div>
            </Modal>
          )}
          {showConfirm && (
            <Confirm
              text="정말로 수정하시겠습니까?"
              onConfirm={handleConfirm}
              onClose={handleCloseConfirm}
            />
          )}
        </>
      )}
      <ToastContainer
        position="bottom-center"
        limit={1}
        closeButton={false}
        autoClose={2000}
        hideProgressBar
        style={{ zIndex: 20000 }}
      />
    </>
  );
};

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  padding-top: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 420px;
  position: relative;
`;

export default ProfileEditModal;
