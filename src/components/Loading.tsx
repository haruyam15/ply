/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { colors } from '@/styles/colors';

const leap = keyframes`
  0% { transform: translateY(0); }
  7% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(1); opacity: 0.5; }
  75% { transform: translateY(10px); }
  100% { transform: translateY(0); }
`;

const loaderStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  height: 50px;
  margin: 0 auto;
`;

const dotStyles = css`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: ${colors.primaryGreen};
`;

const createDotAnimation = (delay: number) => css`
  animation: ${leap} 1s ease-in-out alternate ${delay}s infinite;
`;

const Loading = () => {
  return (
    <div css={loaderStyles}>
      {[0, 0.2, 0.4].map((delay, index) => (
        <div key={index} css={[dotStyles, createDotAnimation(delay)]} />
      ))}
    </div>
  );
};

export default Loading;
