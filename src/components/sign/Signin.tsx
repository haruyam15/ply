/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import Modal from '@/components/Modal';
import useSignModalStore from '@/store/useSignModalStore';
import { colors } from '@/styles/colors';

const Signin: React.FC = () => {
  const signinModal = useSignModalStore((state) => state.signModals);
  const openSigninModal = useSignModalStore((state) => state.openModal);

  const children: React.ReactNode = (
    <>
      <h2 css={{ margin: '40px 0 20px', fontSize: '28px' }}>Login</h2>
      <form css={{ width: '330px' }}>
        <div css={idAndPasswordArea}>
          <input css={idAndPassword} type="text" required />
          <label>ID</label>
        </div>
        <div css={idAndPasswordArea}>
          <input css={idAndPassword} type="password" required />
          <label>Password</label>
        </div>
        <div css={{ fontSize: '14px' }}>
          <label
            css={{ cursor: 'pointer', accentColor: `${colors.primaryGreen}` }}
            htmlFor="remember"
          >
            <input css={{ cursor: 'pointer' }} type="checkBox" id="remember" defaultChecked />
            Remember me
          </label>
        </div>
        <div>
          <button css={submitBtn} type="submit">
            Login
          </button>
        </div>
      </form>
      <p css={{ fontSize: '14px', marginBottom: '40px' }}>
        Don't have an account?
        <button
          css={modalMovementBtn}
          onClick={() => {
            openSigninModal('signup');
          }}
        >
          Sign Up now
        </button>
      </p>
    </>
  );
  return (
    <>
      {signinModal.modalName === 'signin' && signinModal.modalState ? (
        <Modal children={children} modalName="signin" />
      ) : null}
    </>
  );
};

export default Signin;

export const idAndPasswordArea = css`
  position: relative;
  label {
    position: absolute;
    top: 30px;
    left: 10px;
    color: #888;
    transition: all 0.3s ease;
  }
  input:focus + label,
  input:valid + label {
    top: -5px;
    color: #fff;
    font-size: 14px;
  }
`;
export const idAndPassword = css`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  margin: 15px 0 20px;
  outline: none;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: ${colors.white};
`;
export const modalMovementBtn = css`
  margin-left: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.primaryGreen};
`;
export const submitBtn = css`
  width: 100%;
  height: 40px;
  margin: 5px 0 25px;
  border: none;
  border-radius: 10px;
  background-color: ${colors.primaryGreen};
  color: ${colors.white};
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: #00ffa2e2;
  }
`;
