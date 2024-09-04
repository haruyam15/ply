/** @jsxImportSource @emotion/react */

import { useState } from 'react';

import { css } from '@emotion/react';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

import { colors } from '@/styles/colors';
import Confirm from './Confirm';

interface MenuDotProps {
  showEdit?: boolean;
  showDelete?: boolean;
  deleteItem?: (index: number) => void;
  index?: number;
  playlistDataId?: string; // 삭제할 playlist의 ID
}

const MenuDot: React.FC<MenuDotProps> = ({
  showEdit = true,
  showDelete = true,
  deleteItem,
  index,
  playlistDataId, // 삭제할 playlist의 ID를 받아옴
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEdit = () => {
    console.log('Edit clicked');
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`/api/playlistDelete/${playlistDataId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('삭제 성공');
        if (deleteItem && index !== undefined) {
          deleteItem(index); // 삭제 콜백 실행
        }
      } else {
        console.error('삭제 실패:', await response.json());
      }
    } catch (error) {
      console.error('삭제 요청 중 오류 발생:', error);
    } finally {
      setIsConfirmOpen(false);
    }
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  return (
    <div css={menuDotContainerStyle}>
      <div css={menuDotStyle} onClick={toggleMenu}>
        <EllipsisVertical />
      </div>
      {isOpen && (
        <div css={dropdownMenuStyle}>
          {showEdit && (
            <div css={menuItemStyle} onClick={handleEdit}>
              <Pencil />
              <p css={menuTextStyle}>수정</p>
            </div>
          )}
          {showDelete && (
            <div css={menuItemStyle} onClick={handleDelete}>
              <Trash2 />
              <p css={menuTextStyle}>삭제</p>
            </div>
          )}
        </div>
      )}
      {isConfirmOpen && (
        <Confirm
          title="삭제 확인"
          text="정말 삭제하시겠습니까?"
          onConfirm={handleConfirm}
          onClose={handleCloseConfirm}
          deleteItem={deleteItem}
          index={index}
        />
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
  background-color: ${colors.lightblack};
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
  border-bottom: 1px solid #6d6d6d;

  &:hover {
    background-color: ${colors.lightGray};
  }
`;

const menuTextStyle = css`
  margin-top: 8px;
`;

export default MenuDot;
