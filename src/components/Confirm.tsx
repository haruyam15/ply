/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

interface ConfirmDialogProps {
  title: string;
  text: string;
  onConfirm: () => void;
  onClose: () => void;
}

const Confirm: React.FC<ConfirmDialogProps> = ({ title, text, onConfirm, onClose }) => {
  useEffect(() => {
    Swal.fire({
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: '#00FFA3',
      cancelButtonColor: '#7E7E7E',
      confirmButtonText: '예',
      cancelButtonText: '아니요',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button', // 추가
        title: 'custom-title',
        popup: 'custom-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
      onClose();
    });
  }, [title, text, onConfirm, onClose]);

  return <Global styles={ConfirmStyles} />;
};

export default Confirm;

export const ConfirmStyles = css`
    .custom-confirm-button {
        width: 100px;
        height: 40px;
        border-radius: 8px;
        margin: 30px 20px 20px 0;
        color: #FFFFFF !important;
        font-size: 18px !important;
    }

    .custom-cancel-button { /* 추가 */
        width: 100px;
        height: 40px;
        border-radius: 8px;
        margin: 30px 0 20px 20px;
        color: #FFFFFF !important;
        font-size: 18px !important;
    }

    .custom-title {
        margin: 50px 0 30px 0 !important;
        font-size: 24px !important;
        color: #FFFFFF !important;
    }

    .custom-popup {
        background-color: #131516 !important;
    }
`;