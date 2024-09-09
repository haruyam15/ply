/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { ChevronLeft } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { colors } from '@/styles/colors';
import { toast } from 'react-toastify';
import useUserStore from '@/stores/useUserStore';

const PasswordChangeModal: React.FC<{
  onBack: () => void;
  onPasswordChange: (password: string) => void;
}> = ({ onBack, onPasswordChange }) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { userInformation, setUser } = useUserStore.getState();

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
      const checkResponse = await fetch(`/api/passwordCheck/${userInformation.userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputPassword: currentPassword }),
      });

      const checkResult = await checkResponse.json();
      if (!checkResponse.ok || !checkResult.isPasswordValid) {
        setError('현재 비밀번호가 일치하지 않습니다.');
        return;
      }

      const changeResponse = await fetch(`/api/profileEdit/${userInformation.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      const changeResult = await changeResponse.json();
      if (changeResponse.ok && changeResult.success) {
        onPasswordChange(newPassword);
        setUser({ ...userInformation, password: newPassword });
        toast.success('비밀번호가 성공적으로 변경되었습니다.');
        onBack();
      } else {
        setError(changeResult.message || '비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <div css={modalContentStyle} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
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

export default PasswordChangeModal;

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

const passwordErrorStyle = (isVisible: boolean) => css`
  color: ${colors.red};
  font-size: 12px;
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
