/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { ArrowLeft, Home } from 'lucide-react';
import { colors } from '@/styles/colors';
import Button from '@/components/Button';

const ErrorPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      window.location.href = '/';
    }
  }, [timeLeft]);

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>404</h1>
      <p css={subtitleStyle}>앗! 페이지를 찾을 수 없습니다.</p>
      <p css={messageStyle}>
        찾으시는 페이지가 삭제되었거나, 이름이 변경되었거나, 일시적으로 사용할 수 없습니다.
      </p>
      <div css={buttonsStyle}>
        <Button onClick={() => window.history.back()}>
          <ArrowLeft size={16} />
          이전으로
        </Button>
        <Button
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <Home size={16} />
          홈으로
        </Button>
      </div>
      <p css={timerStyle}>{timeLeft}초 후 홈 페이지로 이동합니다...</p>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${colors.black};
  text-align: center;
  padding: 20px;
  color: ${colors.white};
`;

const titleStyle = css`
  font-size: 120px;
  margin: 0;
  color: ${colors.primaryGreen};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const subtitleStyle = css`
  font-size: 24px;
  color: ${colors.lightGray};
  margin-top: 20px;
`;

const messageStyle = css`
  max-width: 600px;
  margin: 20px 0;
  color: ${colors.lightGray};
`;

const buttonsStyle = css`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const timerStyle = css`
  margin-top: 20px;
  color: ${colors.lightGray};
  font-style: italic;
`;

export default ErrorPage;
