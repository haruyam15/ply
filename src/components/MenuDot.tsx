/** @jsxImportSource @emotion/react */

import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
const MenuDot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEdit = () => {
    console.log('Edit clicked');
    setIsOpen(false);
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    setIsOpen(false);
  };

  return (
    <div css={menuDotContainerStyle}>
      <div css={menuDotStyle} onClick={toggleMenu}>
        <EllipsisVertical />
      </div>
      {isOpen && (
        <div css={dropdownMenuStyle}>
          <div css={menuItemStyle} onClick={handleEdit}>
            <Pencil />
            <p css={menuTextStyle}>수정</p>
          </div>
          <div css={menuItemStyle} onClick={handleDelete}>
            <Trash2 />
            <p css={menuTextStyle}>삭제</p>
          </div>
        </div>
      )}
    </div>
  );
};

const menuDotContainerStyle = css`
  position: relative;
  display: inline-block;
`;

const menuDotStyle = css`
  margin-top: 10px;
  cursor: pointer;
`;

const dropdownMenuStyle = css`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: ${colors.gray};
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 80px;
`;

const menuItemStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  color: ${colors.white};
  border-bottom: 1px solid white;

  &:hover {
    background-color: ${colors.lightGray};
  }
`;

const menuTextStyle = css`
  margin-top: 8px;
`;

export default MenuDot;
