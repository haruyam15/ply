/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      css={inputStyle}
    />
  );
};

export default Input;

const inputStyle = css`
  width: 80%;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 15px;
  background-color: ${colors.inputGray};
  border: none;
  border-radius: 10px;
  color: ${colors.white};
  &::placeholder {
    color: ${colors.placeHolderGray};
  }
`;
