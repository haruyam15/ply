/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { Pencil } from 'lucide-react';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Confirm from '@/components/Confirm';
import useModalStore from '@/stores/useModalStore';
import useUserStore, { IUser } from '@/stores/useUserStore';
import { colors } from '@/styles/colors';

const ProfileEditModal: React.FC = () => {
  const profileModal = useModalStore((state) => state.modals);
  const closeProfileModal = useModalStore((state) => state.closeModal);
  const { setUser } = useUserStore();
  const userInformation: IUser = useUserStore((state) => state.userInformation);
  const { profileimage, nickname, userid } = userInformation.information;
  const [newProfileImage, setNewProfileImage] = useState<string>(profileimage);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [newPassword, setNewPassword] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('/api/updateUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid,
          profileimage: newProfileImage,
          password: newPassword,
          nickname: newNickname,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setUser({
          information: {
            _id: userInformation.information._id,
            userid,
            password: newPassword || userInformation.information.password,
            profileimage: newProfileImage,
            nickname: newNickname,
          },
          followers: userInformation.followers,
          following: userInformation.following,
        });

        localStorage.setItem(
          'userInformation',
          JSON.stringify({
            userid,
            profileimage: newProfileImage,
            nickname: newNickname,
            password: newPassword || userInformation.information.password,
            followers: userInformation.followers,
            following: userInformation.following,
          }),
        );

        closeProfileModal('profileEdit');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
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

  const children = (
    <div css={modalContentStyle}>
      <div css={profileImageSection}>
        <img src={newProfileImage} css={modalProfileImage} alt="Profile" />
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
  );

  return (
    <>
      {profileModal.modalName === 'profileEdit' && profileModal.modalState && (
        <Modal children={children} modalName="profileEdit" />
      )}
      {showConfirm && (
        <Confirm
          title="프로필 수정"
          text="정말로 수정하시겠습니까?"
          onConfirm={handleConfirm}
          onClose={handleCloseConfirm}
        />
      )}
    </>
  );
};

export default ProfileEditModal;

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
  width: 100%;
  margin-top: 15px;

  button {
    width: 100%;
    height: 40px;
    margin: 15px 0 25px;
    border: none;
    border-radius: 10px;
    background-color: ${colors.primaryGreen};
    color: ${colors.white};
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      background-color: #00ffa2e2;
    }
    &:hover {
      background-color: ${colors.primaryGreen};
      opacity: 0.8;
    }
  }
`;
