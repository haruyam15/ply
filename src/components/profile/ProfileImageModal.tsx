/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { toast } from 'react-toastify';
import { ChevronLeft, Pencil } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { colors } from '@/styles/colors';

interface ProfileImageModalProps {
  onBack: () => void;
  profileimage: string;
  setNewProfileImage: (image: string) => void;
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({
  onBack,
  profileimage,
  setNewProfileImage,
}) => {
  const [isUploading, setIsUploading] = useState(false);

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
      return data.imageUrl;
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      throw error;
    }
  };

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
    <>
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
    </>
  );
};

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

const modalTitleStyle = css`
  font-size: 24px;
  margin-bottom: 40px;
  color: ${colors.white};
  text-align: center;
  justify-content: center;
  align-items: center;
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

export default ProfileImageModal;
