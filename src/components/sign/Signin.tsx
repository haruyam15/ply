/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import { useCallback, useRef } from 'react';
import { css } from '@emotion/react';
import Modal from '@/components/Modal';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import useUserDataFetch from '@/hooks/useUserDataFetch';
import { debounce } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Signin: React.FC = () => {
  const signinModal = useModalStore((state) => state.modals);
  const openSignupModal = useModalStore((state) => state.openModal);
  const closeSigninModal = useModalStore((state) => state.closeModal);
  const setUserData = useUserStore((state) => state.setUser);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useUserDataFetch();

  const debouncedSignin = useCallback(
    debounce(async (userId, password) => {
      if (userId && password) {
        try {
          const userData = await mutateAsync({ api: 'login', userData: { userId, password } });
          if (typeof userData !== 'number' && userData !== null) {
            toast.success(`환영합니다. ${userData.nickname}님`);
            setTimeout(() => {
              setUserData(userData);
              closeSigninModal('signin');
            }, 2000);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }, 500),
    [],
  );

  const debouncedValidate = useCallback(
    debounce(async (userId, password) => {
      if (userId && password) {
        try {
          const passwordValidateStatus = await mutateAsync({
            api: 'signValidate',
            userData: { userId, password },
          });
          if (passwordValidateStatus === 200) {
            debouncedSignin(userId, password);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 400) {
              const { field } = error.response.data;
              if (field === 'password') {
                toast.error('비밀번호가 일치하지 않습니다.');
              }
            }
          }
        }
      }
    }, 500),
    [debouncedSignin],
  );
  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = idRef.current?.value ?? null;
    const password = passwordRef.current?.value ?? null;
    debouncedValidate(userId, password);
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
            로그인 유지하기
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
            closeSigninModal('signin');
            openSignupModal('signup');
          }}
        >
          회원가입
        </button>
      </p>
      <ToastContainer
        position="bottom-center"
        limit={1}
        closeButton={false}
        autoClose={1500}
        hideProgressBar
      />
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
    top: 28px;
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
  border-radius: 7px;
  margin: 15px 0 20px;
  outline: none;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: ${colors.white};
  color: ${colors.black};
`;
export const modalMovementBtn = css`
  margin-left: 10px;
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
