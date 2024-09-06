/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import Modal from '@/components/Modal';
import ProfileImageModal from './ProfileImageModal';
import NicknameModal from './NicknameModal';
import PasswordChangeModal from './PasswordChangeModal';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { IUserData, IUserInformation } from '@/types/userTypes';
import { ToastContainer } from 'react-toastify';
import { colors } from '@/styles/colors';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEditModal: React.FC = () => {
  const [currentModal, setCurrentModal] = useState<
    'main' | 'profileImage' | 'nickname' | 'password'
  >('main');
  const closeModal = useModalStore((state) => state.closeModal);
  const setUser = useUserStore((state) => state.setUser);
  const userInformation: IUserData = useUserStore((state) => state.userInformation);
  const { profileImage, nickname, userId } = userInformation;
  const [newProfileImage, setNewProfileImage] = useState<string>(profileImage);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [newPassword, setNewPassword] = useState<string>('');

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
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const closeAndSaveProfileEdit = () => {
    handleProfileUpdate();
    closeModal('profileEdit');
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
            <button onClick={closeAndSaveProfileEdit}>저장 후 닫기</button>
          </div>
        );
    }
  };

  return (
    <>
      <Modal modalName="profileEdit">{renderModalContent()}</Modal>
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
