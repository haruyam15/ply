/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Pencil, ChevronLeft } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { colors } from '@/styles/colors';
import { toast } from 'react-toastify';
import useUserStore from '@/stores/useUserStore';

const ProfileImageModal: React.FC<{
  onBack: () => void;
  profileimage: string;
  setNewProfileImage: (image: string) => void;
}> = ({ onBack, profileimage, setNewProfileImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(profileimage);
  const setUser = useUserStore((state) => state.setUser);
  const userInformation = useUserStore((state) => state.userInformation);

  // 엔터 키를 눌렀을 때 handleSubmit 함수 호출
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !isUploading && uploadedImageUrl) {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploading, uploadedImageUrl]);

  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setIsUploading(true);
      setError('');
      try {
        const formData = new FormData();
        formData.append('image', file);

        const uploadResponse = await fetch('https://plyserver.kro.kr/api/uploadImage', {
          method: 'POST',
          body: formData,
        });
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || '이미지 업로드에 실패했습니다.');
        }

        const uploadData = await uploadResponse.json();
        console.log(uploadData);
        setUploadedImageUrl(uploadData.imageUrl);
      } catch (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
        setError(error instanceof Error ? error.message : '이미지 업로드 중 오류가 발생했습니다.');
        toast.error(error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (error || !uploadedImageUrl) {
      toast.error('오류를 해결한 후 다시 시도해주세요.');
      return;
    }

    try {
      const updateResponse = await fetch(
        `https://plyserver.kro.kr/api/profileEdit/${userInformation.userId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileImage: uploadedImageUrl }),
        },
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.message || '프로필 이미지 업데이트에 실패했습니다.');
      }

      const updateResult = await updateResponse.json();
      if (updateResult.success) {
        const updatedUserInfo = { ...userInformation, profileImage: uploadedImageUrl };
        setUser(updatedUserInfo);
        setNewProfileImage(uploadedImageUrl);

        localStorage.setItem('userInformation', JSON.stringify(updatedUserInfo));

        toast.success('프로필 이미지가 변경되었습니다.');
        onBack();
      } else {
        throw new Error(updateResult.message || '프로필 이미지 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('프로필 이미지 업데이트 중 오류 발생:', error);
      toast.error(
        error instanceof Error ? error.message : '프로필 이미지 업데이트에 실패했습니다.',
      );
    }
  };

  return (
    <div css={modalContentStyle}>
      <button css={backButtonStyle} onClick={onBack}>
        <ChevronLeft size={28} />
      </button>
      <h2 css={modalTitleStyle}>프로필 사진 변경</h2>
      <div css={modalProfileImageWrapper}>
        <img src={uploadedImageUrl || profileimage} alt="Profile" css={modalProfileImage} />
        <button
          css={editIconButton}
          onClick={() => document.getElementById('fileInput')?.click()}
          disabled={isUploading}
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
        <Button onClick={handleSubmit} disabled={isUploading}>
          {isUploading ? '업로드 중...' : '변경하기'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileImageModal;

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
