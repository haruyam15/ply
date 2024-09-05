/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { css } from '@emotion/react';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import useDeletePlaylist from '@/hooks/useDeletePlaylist';
import { colors } from '@/styles/colors';
import Confirm from './Confirm';

interface MenuDotProps {
  showEdit?: boolean;
  showDelete?: boolean;
  deleteItem?: (index: number) => void; // 타입: (index: number) => void로 수정
  index?: number; // 삭제할 항목의 index
  videoId: string;
}

const MenuDot: React.FC<MenuDotProps> = ({
  showEdit = true,
  showDelete = true,
  deleteItem,
  index,
  videoId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { deletePlaylist } = useDeletePlaylist(); // useDeletePlaylist에서 deletePlaylist 가져오기

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
      if (index !== undefined && videoId) {
        // videoId가 있는지 확인
        // 서버에 삭제 요청
        await deletePlaylist(videoId, () => {
          if (deleteItem) {
            deleteItem(index); // 삭제 콜백 실행 (index 전달)
          }
        });
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
            <div css={editItemStyle} onClick={handleEdit}>
              <Pencil />
              <p css={menuTextStyle}>수정</p>
            </div>
          )}
          {showDelete && (
            <div css={deleteItemStyle} onClick={handleDelete}>
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
  border: 1px solid ${colors.borderGray};
  border-radius: 5px;
  z-index: 1000;
  min-width: 80px;
`;

const editItemStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  color: ${colors.white};
  border-bottom: 1px solid #4a4a4a;

  &:hover {
    background-color: ${colors.gray};
    border-radius: 5px 5px 0 0;
  }
`;

const deleteItemStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  color: ${colors.white};

  &:hover {
    background-color: ${colors.gray};
    border-radius: 0 0 5px 5px;
  }
`;

const menuTextStyle = css`
  margin-top: 8px;
`;

export default MenuDot;
