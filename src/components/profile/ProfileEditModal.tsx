/** @jsxImportSource @emotion/react */
import { useState, useRef } from 'react';
import { css } from '@emotion/react';
import { ChevronLeft, Pencil } from 'lucide-react';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Confirm from '@/components/Confirm';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IUserData, IUserInformation } from '@/types/userTypes';

const ProfileEditModal: React.FC = () => {
  const [currentModal, setCurrentModal] = useState<
    'main' | 'profileImage' | 'nickname' | 'password'
  >('main');
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { modals, closeModal } = useModalStore();
  const { setUser } = useUserStore();
  const userInformation: IUserData = useUserStore((state) => state.userInformation);
  const { profileImage, nickname, userId } = userInformation;
  const [newProfileImage, setNewProfileImage] = useState<string>(profileImage);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [newPassword, setNewPassword] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const data = await response.json();
      return data.imageUrl; // 서버에서 반환한 이미지 URL
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      throw error;
    }
  };

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
            uploadImage={uploadImage}
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

const ProfileImageModal: React.FC<{
  onBack: () => void;
  profileimage: string;
  setNewProfileImage: (image: string) => void;
  uploadImage: (file: File) => Promise<string>;
}> = ({ onBack, profileimage, setNewProfileImage, uploadImage }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setIsUploading(true);

      try {
        const imageUrl = await uploadImage(file);
        setNewProfileImage(imageUrl);
        toast.success('프로필 이미지가 업로드되었습니다.');
      } catch (error) {
        toast.error('이미지 업로드에 실패했습니다.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = () => {
    toast.success('프로필 사진이 변경되었습니다.');
    onBack();
  };

  return (
    <div css={modalContentStyle}>
      <button css={backButtonStyle} onClick={onBack}>
        <ChevronLeft size={28} />
      </button>
      <h2 css={modalTitleStyle}>프로필 사진 변경</h2>
      <div css={modalProfileImageWrapper}>
        <img src={profileimage} alt="Profile" css={modalProfileImage} />
        <button css={editIconButton} onClick={() => document.getElementById('fileInput')?.click()}>
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
        <Button onClick={handleSubmit}>변경하기</Button>
      </div>
    </div>
  );
};

const NicknameModal: React.FC<{
  onBack: () => void;
  nickname: string;
  setNewNickname: (nickname: string) => void;
}> = ({ onBack, nickname, setNewNickname }) => {
  const [tempNickname, setTempNickname] = useState<string>(nickname);
  const [error, setError] = useState<string>('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setTempNickname(newNickname);

    if (newNickname.length < 2 || newNickname.length > 20) {
      setError('닉네임은 2자 이상 20자 이하여야 합니다.');
    } else {
      setError('');

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        checkNicknameAvailability(newNickname);
      }, 500);
    }
  };

  const checkNicknameAvailability = async (newNickname: string) => {
    try {
      const response = await fetch(`/api/nicknameCheck/${newNickname}`);
      const result = await response.json();

      if (result.isDuplicate) {
        setError('이미 존재하는 닉네임입니다.');
      } else {
        setError('');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류 발생:', error);
      setError('닉네임 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = () => {
    if (error) return;
    setNewNickname(tempNickname);
    toast.success('닉네임이 변경되었습니다.');
    onBack();
  };

  return (
    <div css={modalContentStyle}>
      <button css={backButtonStyle} onClick={onBack}>
        <ChevronLeft size={28} />
      </button>
      <h2 css={modalTitleStyle}>닉네임 변경</h2>
      <Input value={tempNickname} onChange={handleNicknameChange} type="text" />
      {<p css={errorStyle(!!error)}>{error || ' '}</p>}
      <div css={buttonWrapperStyle}>
        <Button onClick={handleSubmit} disabled={!!error}>
          변경하기
        </Button>
      </div>
    </div>
  );
};

const PasswordChangeModal: React.FC<{
  onBack: () => void;
  onPasswordChange: (password: string) => void;
}> = ({ onBack, onPasswordChange }) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async () => {
    if (!validatePassword(newPassword)) {
      setError(
        '비밀번호는 최소 6자 이상이어야 하며 숫자, 영문, 특수 문자의 조합을 포함해야 합니다.',
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const userId = useUserStore.getState().userInformation.userId;
      const response = await fetch(`/api/passwordCheck/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputPassword: currentPassword }),
      });

      const result = await response.json();

      if (response.ok && result.isPasswordValid) {
        onPasswordChange(newPassword);
        toast.success('비밀번호가 성공적으로 변경되었습니다.');
        onBack();
      } else {
        setError('현재 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Failed to check password:', error);
      toast.error('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div css={modalContentStyle}>
      <button css={backButtonStyle} onClick={onBack}>
        <ChevronLeft size={28} />
      </button>
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
      {<p css={passwordErrorStyle(!!error)}>{error || ' '}</p>}
      <div css={buttonWrapperStyle}>
        <Button onClick={handleSubmit}>변경하기</Button>
      </div>
    </div>
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

const modalProfileImageWrapper = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: ${colors.gray};
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
    background-color: ${colors.primaryGreen};
  }
`;

const modalTitleStyle = css`
  font-size: 24px;
  margin-bottom: 40px;
  color: ${colors.white};
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const backButtonStyle = css`
  position: absolute;
  top: 0;
  left: -30px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #888;
  padding: 11px;
`;

const errorStyle = (isVisible: boolean) => css`
  color: ${colors.red};
  font-size: 14px;
  margin-top: 5px;
  height: 20px;
  visibility: ${isVisible ? 'visible' : 'hidden'};
  white-space: nowrap;
  text-align: center;
`;

const passwordErrorStyle = (isVisible: boolean) => css`
  color: ${colors.red};
  font-size: 12px;
  margin-top: 5px;
  height: 20px;
  visibility: ${isVisible ? 'visible' : 'hidden'};
  white-space: nowrap;
  text-align: center;
`;
