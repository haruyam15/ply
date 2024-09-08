/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface EmptyMessageProps {
  message: string;
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ message }) => {
  return <div css={emptyMessageStyle}>{message}</div>;
};

const emptyMessageStyle = css`
  text-align: center;
  font-size: 18px;
  color: #555;
  margin-top: 20px;
`;

export default EmptyMessage;
