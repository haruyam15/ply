/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { forwardRef } from 'react';
import { colors } from '@/styles/colors';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, value, onChange, placeholder, ...rest }, ref) => {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        css={inputStyle}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;

const inputStyle = css`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 15px;
  box-sizing: border-box;
  background-color: ${colors.inputGray};
  border: none;
  border-radius: 10px;
  color: ${colors.white};
  &::placeholder {
    color: ${colors.placeHolderGray};
  }
`;
