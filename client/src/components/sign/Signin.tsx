/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import { useCallback, useRef } from 'react';
import { css } from '@emotion/react';
import Modal from '@/components/Modal';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import useUserDataFetch from '@/hooks/useUserDataFetch';
import Input from '@/components/Input';
import { throttle } from 'lodash';
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

  const throttleFetchSignin = useCallback(
    throttle(async (userId, password) => {
      if (userId && password) {
        try {
          const userData = await mutateAsync({ api: 'login', userData: { userId, password } });
          if (typeof userData !== 'number' && userData !== null) {
            toast.success(`환영합니다. ${userData.nickname}님`);
            setTimeout(() => {
              setUserData(userData);
              closeSigninModal('signin');
            }, 1500);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }, 500),
    [],
  );

  const throttleFetchValidate = useCallback(
    throttle(async (userId, password) => {
      if (userId && password) {
        try {
          const passwordValidateStatus = await mutateAsync({
            api: 'signValidate',
            userData: { userId, password },
          });
          if (passwordValidateStatus === 200) {
            throttleFetchSignin(userId, password);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
              const { field } = error.response.data;
              if (field === 'userId') {
                toast.error('존재하지 않는 계정입니다.');
              }
              if (field === 'password') {
                toast.error('비밀번호가 일치하지 않습니다.');
              }
            }
          }
        }
      }
    }, 500),
    [],
  );
  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = idRef.current?.value ?? null;
    const password = passwordRef.current?.value ?? null;
    throttleFetchValidate(userId, password);
  };

  const children: React.ReactNode = (
    <>
      <h2 css={{ margin: '40px 0 20px', fontSize: '28px' }}>로그인</h2>
      <form css={{ width: '330px' }} onSubmit={(e) => onLogin(e)}>
        <div css={idAndPasswordArea}>
          <Input id="id" css={idAndPassword} ref={idRef} type="text" required />
          <label htmlFor="id">아이디</label>
        </div>
        <div css={idAndPasswordArea}>
          <Input id="userPassword" css={idAndPassword} ref={passwordRef} type="password" required />
          <label htmlFor="userPassword">비밀번호</label>
        </div>
        <div css={{ fontSize: '14px', marginTop: '15px' }}>
          <label
            css={{ cursor: 'pointer', accentColor: `${colors.primaryGreen}` }}
            htmlFor="remember"
          >
            <input css={{ cursor: 'pointer' }} type="checkBox" id="remember" defaultChecked />
            로그인 유지하기
          </label>
        </div>
        <div>
          <button id="login" css={submitBtn} type="submit">
            로그인
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
    color: ${colors.white};
    font-size: 14px;
  }
`;
export const idAndPassword = css`
  height: 40px;
  margin: 15px 0 20px;
  outline: none;
`;
export const modalMovementBtn = css`
  margin-top: 10px;
  margin-left: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.primaryGreen};
`;
export const submitBtn = css`
  width: 100%;
  height: 40px;
  margin: 10px 0 25px;
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
