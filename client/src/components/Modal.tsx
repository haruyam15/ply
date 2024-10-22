/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { X } from 'lucide-react';
import useModalStore from '@/stores/useModalStore';
import { colors } from '@/styles/colors';

interface ModalProps {
  children: React.ReactNode;
  modalName: string;
}

const Modal = ({ children, modalName }: ModalProps) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div css={wrapper}>
      <div css={modalArea}>
        <button css={closeBtn} onClick={() => closeModal(modalName)}>
          <X css={{ color: '#888' }} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

const wrapper = css`
  margin: 0;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 14000;
`;
const modalArea = css`
  position: relative;
  width: 500px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.black};
  border-radius: 15px;
  align-items: center;
`;
const closeBtn = css`
  position: absolute;
  right: 0;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 10px;
  cursor: pointer;
`;
