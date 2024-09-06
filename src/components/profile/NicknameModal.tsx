/** @jsxImportSource @emotion/react */
import { useState, useRef } from 'react';
import { css } from '@emotion/react';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { colors } from '@/styles/colors';

interface NicknameModalProps {
  onBack: () => void;
  nickname: string;
  setNewNickname: (nickname: string) => void;
}

const NicknameModal: React.FC<NicknameModalProps> = ({ onBack, nickname, setNewNickname }) => {
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
      <Input
        value={tempNickname}
        onChange={handleNicknameChange}
        type="text"
        placeholder="새 닉네임을 입력하세요"
      />
      <p css={errorStyle(!!error)}>{error || ' '}</p>
      <div css={buttonWrapperStyle}>
        <Button onClick={handleSubmit} disabled={!!error || tempNickname === nickname}>
          변경하기
        </Button>
      </div>
    </div>
  );
};

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const backButtonStyle = css`
  position: absolute;
  top: 0;
  left: -30px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${colors.gray};
  padding: 11px;
`;

const modalTitleStyle = css`
  font-size: 24px;
  margin-bottom: 40px;
  color: ${colors.white};
  text-align: center;
`;

const errorStyle = (isVisible: boolean) => css`
  color: ${colors.red};
  font-size: 14px;
  margin-top: 10px;
  height: 20px;
  visibility: ${isVisible ? 'visible' : 'hidden'};
  text-align: center;
`;

const buttonWrapperStyle = css`
  width: 100%;
  margin-top: 20px;

  button {
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 10px;
    background-color: ${colors.primaryGreen};
    color: ${colors.white};
    font-size: 18px;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;

    &:hover:not(:disabled) {
      opacity: 0.8;
    }

    &:disabled {
      background-color: ${colors.gray};
      cursor: not-allowed;
    }
  }
`;

export default NicknameModal;
