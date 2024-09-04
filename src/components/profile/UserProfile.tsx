/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css, Global } from '@emotion/react';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import Confirm, { ConfirmStyles } from '@/components/Confirm';
import { IUserData } from '@/types/userTypes';

interface ProfileProps {
  user: IUserData;
}

export interface RealUserData {
  userId: string;
  profileimage: string;
  nickname: string;
  password: string;
  followers: string[];
  following: string[];
}

const UserProfile: React.FC<ProfileProps> = ({ user }) => {
  const profileModal = useModalStore((state) => state.modals);
  const openProfileModal = useModalStore((state) => state.openModal);
  const closeProfileModal = useModalStore((state) => state.closeModal);
  const setUser = useUserStore((state) => state.setUser);
  const { profileImage, nickname, userId } = user;

  const [newProfileImage, setNewProfileImage] = useState<string>(profileImage);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [newPassword, setNewPassword] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleOpenProfileModal = () => {
    setNewNickname(nickname);
    setNewPassword('');
    openProfileModal('profileEdit');
  };

  const handleCloseProfileModal = () => closeProfileModal('profileEdit');

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('/api/updateUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          profileimage: newProfileImage,
          password: newPassword,
          nickname: newNickname,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setUser({
          userId,
          password: newPassword || user.password,
          profileImage: newProfileImage,
          nickname: newNickname,
          likes: user.likes,
          followers: user.followers,
          following: user.following,
          myPlaylists: user.myPlaylists,
        });
        handleCloseProfileModal();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleImageEdit = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setNewProfileImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    handleProfileUpdate();
    setShowConfirm(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
      <Global styles={ConfirmStyles} />
      <img css={profileimageArea} src={newProfileImage} alt="Profile" />
      <div css={{ marginLeft: '30px' }}>
        <h1 css={{ fontSize: '32px' }}>{newNickname}</h1>
        <div
          css={{
            width: '300px',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px 5px 20px',
            color: `${colors.lightestGray}`,
          }}
        >
          <p>@{userId}</p>
          <Link to="/follow" css={{ color: `${colors.lightestGray}` }}>
            팔로워 {user.followers?.length || 0}
          </Link>
          <Link to="/playlist" css={{ color: `${colors.lightestGray}` }}>
            플레이리스트 {user.following?.length || 0}
          </Link>
        </div>
        {user?.userId === userId ? (
          <button css={profileEditOrFollowerBtn} onClick={handleOpenProfileModal}>
            프로필 수정
          </button>
        ) : (
          <button css={profileEditOrFollowerBtn}>팔로우</button>
        )}
      </div>
      {profileModal.modalName === 'profileEdit' && profileModal.modalState && (
        <Modal modalName="profileEdit">
          <div css={modalContentStyle}>
            <div css={profileImageSection}>
              <img src={newProfileImage} css={modalProfileImage} />
              <button css={editIconButton} onClick={handleImageEdit}>
                <Pencil size={20} color={colors.white} />
              </button>
            </div>
            <Input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="새 닉네임"
            />
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호"
            />
            <div css={buttonWrapperStyle}>
              <Button size="md" onClick={handleShowConfirm}>
                수정
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {showConfirm && (
        <Confirm
          title="프로필 수정"
          text="정말로 수정하시겠습니까?"
          onConfirm={handleConfirm}
          onClose={handleCloseConfirm}
        />
      )}
    </div>
  );
};

export default UserProfile;

const profileimageArea = css`
  width: 230px;
  height: 230px;
  border-radius: 50%;
`;

const profileEditOrFollowerBtn = css`
  width: 100px;
  height: 30px;
  background-color: ${colors.gray};
  color: ${colors.white};
  font-weight: 500;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #878787;
  }
`;

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #1e1e1e;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
`;

const profileImageSection = css`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

const modalProfileImage = css`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${colors.lightestGray};
  margin-right: 30px;
`;

const editIconButton = css`
  background-color: ${colors.lightGray};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  &:hover {
    background-color: #00cc75;
  }
`;

const buttonWrapperStyle = css`
  width: 85%;
  margin-top: 15px;

  button {
    width: 100%;
    font-size: 16px;
    background-color: ${colors.primaryGreen};
    color: ${colors.white};
    text-align: center;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    &:hover {
      background-color: ${colors.primaryGreen};
      opacity: 0.8;
    }
  }
`;
