/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Confirm from '@/components/Confirm';
import ProfileImageModal from './ProfileImageModal';
import NicknameModal from './NicknameModal';
import PasswordChangeModal from './PasswordChangeModal';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { IUserData, IUserInformation } from '@/types/userTypes';
import { toast, ToastContainer } from 'react-toastify';
import { colors } from '@/styles/colors';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEditModal: React.FC = () => {
  const [currentModal, setCurrentModal] = useState<
    'main' | 'profileImage' | 'nickname' | 'password'
  >('main');
  const [isModalVisible, setIsModalVisible] = useState(true);
  const modals = useModalStore((state) => state.modals);
  const closeModal = useModalStore((state) => state.closeModal);
  const setUser = useUserStore((state) => state.setUser);
  const userInformation: IUserData = useUserStore((state) => state.userInformation);
  const { profileImage, nickname, userId } = userInformation;
  const [newProfileImage, setNewProfileImage] = useState<string>(profileImage);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [newPassword, setNewPassword] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleProfileUpdate = async () => {
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
  };

  const handleConfirm = () => {
    handleProfileUpdate();
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
          <div css={modalContentStyle}>
            <div css={profileHeaderStyle}>
              <img src={newProfileImage} alt="Profile" css={profileImageStyle} />
              <div css={profileTextStyle}>
                <h2>{newNickname}</h2>
                <span>{userId}</span>
              </div>
            </div>
            <ul css={listStyle}>
              <li onClick={() => setCurrentModal('profileImage')}>프로필 사진 변경</li>
              <li onClick={() => setCurrentModal('nickname')}>닉네임 변경</li>
              <li onClick={() => setCurrentModal('password')}>비밀번호 변경</li>
            </ul>
            <div css={buttonWrapperStyle}>
              <Button onClick={handleShowConfirm}>적용하기</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {modals.modalName === 'profileEdit' && modals.modalState && (
        <>
          {isModalVisible && <Modal modalName="profileEdit">{renderModalContent()}</Modal>}
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

export default ProfileEditModal;

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

const profileHeaderStyle = css`
  display: flex;
  align-items: center;
  margin: 10px 0 20px;
`;

const profileImageStyle = css`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
  border: 2px solid ${colors.primaryGreen};
`;

const profileTextStyle = css`
  h2 {
    margin-bottom: 10px;
    font-size: 20px;
    text-align: center;
  }
  span {
    font-size: 16px;
    color: ${colors.gray};
  }
`;

const listStyle = css`
  list-style: none;
  padding: 16px 0;
  padding-bottom: 0;
  margin: 0;
  width: 100%;
  li {
    margin-bottom: 10px;
    padding: 16px;
    cursor: pointer;
    text-align: left;
    background-color: ${colors.inputGray};
    border-radius: 10px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const buttonWrapperStyle = css`
  width: 100%;
  margin-top: 15px;
  button {
    width: 100%;
    height: 45px;
    margin: 20px 0 25px;
    border: none;
    border-radius: 10px;
    background-color: ${colors.primaryGreen};
    color: ${colors.white};
    font-size: 20px;
    cursor: pointer;
    &:hover {
      background-color: ${colors.primaryGreen};
      opacity: 0.8;
      border: none;
    }
  }
`;
