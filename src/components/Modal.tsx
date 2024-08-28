/** @jsxImportSource @emotion/react */
import React from 'react';

import { css } from '@emotion/react';
import { X } from 'lucide-react';

import useModalStore from '@/stores/useModalStore';
import { colors } from '@/styles/colors';

interface SignModalProps {
  children: React.ReactNode;
  modalName: string;
}

const Modal = ({ children, modalName }: SignModalProps) => {
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
  z-index: 1000;
`;
const modalArea = css`
  position: relative;
  width: 480px;
  display: flex;
  flex-direction: column;
  background-color: #1d1d1d;
  border-radius: 15px;
  color: ${colors.white};
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
