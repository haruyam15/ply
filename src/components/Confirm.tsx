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
      showClass: {
        popup: 'swal2-show',
        backdrop: 'swal2-backdrop-show',
        icon: 'swal2-icon-show',
      },
      hideClass: {
        popup: 'swal2-hide',
        backdrop: 'swal2-backdrop-hide',
        icon: 'swal2-icon-hide',
      },
      background: '#222',
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
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    background-color: #00cc75;
  }

  .custom-cancel-button {
    width: 120px;
    height: 40px;
    border-radius: 10px;
    margin: 25px 15px 20px 15px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
  }

  .custom-popup {
    padding: 20px;
    padding-top: 40px;
    background-color: #222;
    border-radius: 10px;
    color: #ffffff;
    font-size: 18px;
  }

  .swal2-show {
    animation: fadeIn 0.3s;
  }

  .swal2-hide {
    animation: fadeOut 0.3s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
