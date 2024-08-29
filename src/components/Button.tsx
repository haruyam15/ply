/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { colors } from '@/styles/colors';

interface ButtonProps {
  children: React.ReactNode;
  size?: Size;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type Size = 'sm' | 'md' | 'lg';

function Button({ children, size = 'sm', type, onClick }: ButtonProps) {
  return (
    <button css={btn(size)} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

const btn = (size: Size) => css`
  display: flex;
  align-items: center;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  padding: 0 13px;
  color: ${colors.white};
  svg {
    margin-right: 5px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  ${size === 'md' &&
  `
		height: 40px;
		font-size:15px;
	`}
  ${size === 'lg' &&
  `
		height: 60px;
		font-size:20px;
	`}
`;
