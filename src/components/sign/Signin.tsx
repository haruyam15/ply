/** @jsxImportSource @emotion/react */
import { useRef } from 'react';
import { css } from '@emotion/react';
import Modal from '@/components/Modal';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import useUserDataFetch from '@/hooks/useUserDataFetch';

const Signin: React.FC = () => {
  const signinModal = useModalStore((state) => state.modals);
  const openSigninModal = useModalStore((state) => state.openModal);
  const closeSigninModal = useModalStore((state) => state.closeModal);
  const setUserData = useUserStore((state) => state.setUser);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useUserDataFetch();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = idRef.current?.value ?? null;
    const password = passwordRef.current?.value ?? null;
    if (userId && password) {
      try {
        const fetchUserData = {
          userId,
          password,
        };
        const userData = await mutateAsync({ api: 'login', userData: fetchUserData });
        if (typeof userData !== 'number' && userData !== null) {
          setUserData(userData);
          closeSigninModal('signin');
          location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const children: React.ReactNode = (
    <>
      <h2 css={{ margin: '40px 0 20px', fontSize: '28px' }}>Login</h2>
      <form css={{ width: '330px' }} onSubmit={(e) => onLogin(e)}>
        <div css={idAndPasswordArea}>
          <input css={idAndPassword} ref={idRef} type="text" required />
          <label>ID</label>
        </div>
        <div css={idAndPasswordArea}>
          <input css={idAndPassword} ref={passwordRef} type="password" required />
          <label>Password</label>
        </div>
        <div css={{ fontSize: '14px' }}>
          <label
            css={{ cursor: 'pointer', accentColor: `${colors.primaryGreen}` }}
            htmlFor="remember"
          >
            <input css={{ cursor: 'pointer' }} type="checkBox" id="remember" defaultChecked />
            Remember ID
          </label>
        </div>
        <div>
          <button css={submitBtn} type="submit">
            Login
          </button>
        </div>
      </form>
      <p css={{ fontSize: '14px', marginBottom: '40px' }}>
        계정이 없으신가요?
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
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #00ffa2e2;
  }
`;
