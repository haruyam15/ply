/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import axios from 'axios';

import Modal from '@/components/Modal';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface LoginData {
  userid: string | null;
  password: string | null;
}

interface RealUserData {
  _id: string;
  userid: string;
  profileimage: string;
  nickname: string;
  password: string;
  followers: string[];
  following: string[];
}

const storageUserData = localStorage.getItem('userInformation');
export const realUserData: RealUserData | null = storageUserData
  ? JSON.parse(storageUserData)
  : null;

const Signin: React.FC = () => {
  const signinModal = useModalStore((state) => state.modals);
  const openSigninModal = useModalStore((state) => state.openModal);
  const closeSigninModal = useModalStore((state) => state.closeModal);
  const setUserData = useUserStore((state) => state.setUser);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loginData, setLoginData] = useState<LoginData>({ userid: null, password: null });

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userid = idRef.current?.value ?? null;
    const password = passwordRef.current?.value ?? null;
    setLoginData({ userid, password });
  };

  useEffect(() => {
    if (loginData.userid && loginData.password) {
      const fetchUserData = async () => {
        try {
          const res = await axios.post('/api/login', {
            userid: loginData.userid,
            password: loginData.password,
          });
          const userData = res.data.user;
          if (userData.information.userid) {
            setUserData(userData);
            localStorage.setItem(
              'userInformation',
              JSON.stringify({
                _id: userData._id,
                userid: userData.information.userid,
                password: userData.information.password,
                profileimage: userData.information.profileimage,
                nickname: userData.information.nickname,
                followers: userData.followers,
                following: userData.following,
              }),
            );
            closeSigninModal('signin');
            location.reload();
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserData();
    }
  }, [loginData, setUserData, closeSigninModal]);

  if (realUserData) {
    const userData = {
      information: {
        _id: realUserData._id,
        userid: realUserData.userid,
        password: realUserData.password,
        profileimage: realUserData.profileimage,
        nickname: realUserData.nickname,
      },
      followers: realUserData.followers,
      following: realUserData.following,
    };
    setUserData(userData);
  }

  const children: React.ReactNode = (
    <>
      <h2 css={{ margin: '40px 0 40px', fontSize: '28px' }}>로그인</h2>
      <form css={{ width: '330px' }} onSubmit={(e) => onLogin(e)}>
        <div css={idAndPasswordArea}>
          <Input css={idAndPassword} ref={idRef} type="text" required />
          <label>아이디</label>
        </div>
        <div css={idAndPasswordArea}>
          <Input css={idAndPassword} ref={passwordRef} type="password" required />
          <label>비밀번호</label>
        </div>
        <div css={{ fontSize: '14px' }}>
          <label
            css={{
              cursor: 'pointer',
              accentColor: `${colors.primaryGreen}`,
            }}
            htmlFor="remember"
          >
            <input
              css={{ cursor: 'pointer', marginRight: '10px' }}
              type="checkBox"
              id="remember"
              defaultChecked
            />
            아이디 기억하기
          </label>
        </div>
        <div>
          <Button css={submitBtn} type="submit">
            로그인
          </Button>
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
          회원가입
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
    top: 14px;
    left: 10px;
    transition: all 0.3s ease;
    color: ${colors.placeHolderGray};
  }
  input:focus + label,
  input:valid + label {
    top: -20px;
    color: ${colors.placeHolderGray};
    font-size: 16px;
  }
`;

export const idAndPassword = css`
  width: 100%;
  border: none;
  border-radius: 10px;
  margin-bottom: 30px;
  outline: none;
  padding: 12px;
  box-sizing: border-box;
  background-color: ${colors.inputGray};
`;

export const modalMovementBtn = css`
  margin: 20px 0 0 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.primaryGreen};
`;

export const submitBtn = css`
  width: 100%;
  height: 40px;
  margin: 15px 0 25px;
  border: none;
  border-radius: 10px;
  background-color: ${colors.primaryGreen};
  color: ${colors.white};
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryGreen};
    opacity: 0.8;
  }
`;
