/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';

interface PasswordChangeModalProps {
  onBack: () => void;
  onPasswordChange: (password: string) => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ onBack, onPasswordChange }) => {
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
    <>
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
      {<p css={errorStyle(!!error)}>{error || ' '}</p>}
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

const errorStyle = (isVisible: boolean) => css`
  color: ${colors.red};
  font-size: 14px;
  margin-top: 5px;
  height: 20px;
  visibility: ${isVisible ? 'visible' : 'hidden'};
  white-space: nowrap;
  text-align: center;
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

export default PasswordChangeModal;
