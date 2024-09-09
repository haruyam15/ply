/** @jsxImportSource @emotion/react */
import { useState, useRef } from 'react';
import { css } from '@emotion/react';
import { ChevronLeft } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';

const NicknameModal: React.FC<{
  onBack: () => void;
  nickname: string;
  setNewNickname: (nickname: string) => void;
}> = ({ onBack, nickname, setNewNickname }) => {
  const [tempNickname, setTempNickname] = useState<string>(nickname);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const userInformation = useUserStore((state) => state.userInformation);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setTempNickname(newNickname);

    if (newNickname.length < 2 || newNickname.length > 20) {
      setError('닉네임은 2자 이상 20자 이하여야 합니다.');
    } else {
      setError('');
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => checkNicknameAvailability(newNickname), 500);
    }
  };

  const checkNicknameAvailability = async (newNickname: string) => {
    if (newNickname === nickname) return;
    try {
      const response = await fetch(`/api/nicknameCheck/${newNickname}`);
      if (!response.ok) throw new Error('서버 응답 오류');
      const result = await response.json();
      if (result.isDuplicate) setError('이미 존재하는 닉네임입니다.');
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류 발생:', error);
      setError('닉네임 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (error || isLoading || tempNickname === nickname) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/profileEdit/${userInformation.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: tempNickname }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setNewNickname(tempNickname);
        setUser({ ...userInformation, nickname: tempNickname });
        toast.success('닉네임이 변경되었습니다.');
        onBack();
      } else {
        throw new Error(result.message || '닉네임 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('닉네임 변경 중 오류 발생:', error);
      toast.error(error instanceof Error ? error.message : '닉네임 변경 중 오류가 발생했습니다.');
      setError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div css={modalContentStyle} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
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

export default NicknameModal;

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
