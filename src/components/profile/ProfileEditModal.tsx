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
  const [currentModal, setCurrentModal] = useState<
    'main' | 'profileImage' | 'nickname' | 'password'
  >('main');
  const { modals, closeModal } = useModalStore();
  const { setUser } = useUserStore();
  const userInformation: IUser = useUserStore((state) => state.userInformation);
  const { profileimage, nickname, userid } = userInformation.information;
  const [newProfileImage, setNewProfileImage] = useState<string>(profileimage);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [newPassword] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);

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

        closeModal('profileEdit');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        return <PasswordChangeModal onBack={() => setCurrentModal('main')} />;
      default:
        return (
          <Modal modalName="profileEdit">
            <div css={modalContentStyle}>
              <div css={profileHeaderStyle}>
                <img src={profileimage} alt="Profile" css={profileImageStyle} />
                <div css={profileTextStyle}>
                  <h2>{nickname}</h2>
                  <span>@{userid}</span>
                </div>
              </div>
              <ul css={listStyle}>
                <li onClick={() => setCurrentModal('profileImage')}>프로필 사진 변경</li>
                <li onClick={() => setCurrentModal('nickname')}>닉네임 변경</li>
                <li onClick={() => setCurrentModal('password')}>비밀번호 변경</li>
              </ul>
            </div>
          </Modal>
        );
    }
  };

  return (
    <>
      {modals.modalName === 'profileEdit' && modals.modalState && (
        <>
          {renderModalContent()}
          {showConfirm && (
            <Confirm
              title="프로필 수정"
              text="정말로 수정하시겠습니까?"
              onConfirm={handleConfirm}
              onClose={handleCloseConfirm}
            />
          )}
        </>
      )}
    </>
  );
};

const ProfileImageModal: React.FC<{
  onBack: () => void;
  profileimage: string;
  setNewProfileImage: (image: string) => void;
}> = ({ onBack, profileimage, setNewProfileImage }) => {
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Modal modalName="profileImage">
      <div css={modalContentStyle}>
        <h2 css={modalTitleStyle}>프로필 사진</h2>
        <div>
          <img src={profileimage} alt="Profile" css={modalProfileImage} />
          <button
            css={editIconButton}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <Pencil size={20} color={colors.white} />
          </button>
        </div>
        <Input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          style={{ display: 'none' }}
        />
        <div css={buttonWrapperStyle}>
          <Button onClick={onBack}>완료</Button>
        </div>
      </div>
    </Modal>
  );
};

const NicknameModal: React.FC<{
  onBack: () => void;
  nickname: string;
  setNewNickname: (nickname: string) => void;
}> = ({ onBack, nickname, setNewNickname }) => {
  return (
    <Modal modalName="nickname">
      <div css={modalContentStyle}>
        <h2 css={modalTitleStyle}>이름</h2>
        <Input value={nickname} onChange={(e) => setNewNickname(e.target.value)} type={''} />
        <p css={noteStyle}>이름은 14일 동안 최대 두 번까지 변경할 수 있습니다.</p>
        <div css={buttonWrapperStyle}>
          <Button onClick={onBack}>완료</Button>
        </div>
      </div>
    </Modal>
  );
};

const PasswordChangeModal: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    // Handle password change logic
    onBack();
  };

  return (
    <Modal modalName="password">
      <div css={modalContentStyle}>
        <h2 css={modalTitleStyle}>비밀번호 변경</h2>
        <Input
          type="password"
          placeholder="현재 비밀번호"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="새 비밀번호 재입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p css={noteStyle}>
          비밀번호는 최소 6자 이상이어야 하며 숫자, 영문, 특수 문자의 조합을 포함해야 합니다.
        </p>
        <div css={buttonWrapperStyle}>
          <Button onClick={handleSubmit}>비밀번호 변경</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;

// 스타일 정의
const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 420px;
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
  border: 1px solid ${colors.primaryGreen};
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
      background-color: #00ffa2e2;
    }
    &:hover {
      opacity: 0.8;
    }
  }
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

const modalTitleStyle = css`
  font-size: 24px;
  margin-top: 25px;
  margin-bottom: 40px;
  color: ${colors.white};
`;

const noteStyle = css`
  font-size: 12px;
  color: ${colors.gray};
`;
