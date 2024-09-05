/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { css, Global } from '@emotion/react';
import Swal from 'sweetalert2';

interface ConfirmDialogProps {
  text: string;
  onConfirm: () => void;
  onClose: () => void;
  deleteItem?: (index: number) => void;
  index?: number;
}

const Confirm: React.FC<ConfirmDialogProps> = ({ text, onConfirm, onClose, index, deleteItem }) => {
  useEffect(() => {
    Swal.fire({
      text,
      showCancelButton: true,
      confirmButtonColor: '#00cc75',
      cancelButtonColor: '#6B6B6B',
      confirmButtonText: '예',
      cancelButtonText: '아니요',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
        popup: 'custom-popup',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
        if (deleteItem && index != null && index >= 0) {
          deleteItem(index);
        }
      }
      onClose();
    });
  }, [text, onConfirm, onClose, deleteItem, index]);

  return <Global styles={ConfirmStyles} />;
};

export default Confirm;

export const ConfirmStyles = css`
  .swal2-container {
    z-index: 21000;
  }

  .custom-confirm-button {
    width: 120px;
    height: 40px;
    border-radius: 10px;
    margin: 25px 15px 20px 15px;
    color: #ffffff !important;
    font-size: 18px !important;
    font-weight: 500;
    background-color: #00cc75 !important;
  }

  .custom-cancel-button {
    width: 120px;
    height: 40px;
    border-radius: 10px;
    margin: 25px 15px 20px 15px;
    color: #ffffff !important;
    font-size: 18px !important;
    font-weight: 500;
  }

  .custom-popup {
    padding: 20px !important;
    padding-top: 40px !important;
    background-color: #222 !important; /* 팝업 배경을 어두운 회색으로 변경 */
    border-radius: 10px !important;
    color: #ffffff !important;
    font-size: 18px !important;
  }
`;
