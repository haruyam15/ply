/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@/components/Modal';
import {
  submitBtn,
  idAndPasswordArea,
  idAndPassword,
  modalMovementBtn,
} from '@/components/sign/Signin';
import useModalStore from '@/stores/useModalStore';
import { colors } from '@/styles/colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useUserDataFetch from '@/hooks/useUserDataFetch';

export interface SignupData {
  nickname?: string | null;
  userId?: string | null;
  password?: string | null;
}

const Signup: React.FC = () => {
  const signupModal = useModalStore((state) => state.modals);
  const openSigninModal = useModalStore((state) => state.openModal);
  const closeSignupModal = useModalStore((state) => state.closeModal);
  const [newUser, setNewUser] = useState<SignupData>({
    nickname: null,
    userId: null,
    password: null,
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rePasswordRef = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useUserDataFetch();

  const checkbox = document.getElementById('check') as HTMLInputElement;
  const passwordCheckRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  useEffect(() => {
    const validation = async () => {
      try {
        if (!signupModal.modalState) {
          return;
        }
        if (
          newUser.password &&
          newUser.nickname &&
          newUser.userId &&
          !checkbox?.checked &&
          signupModal.modalState
        ) {
          toast.error('모두 확인하였는지 체크해주세요.');
          return;
        }
        if (newUser.password) {
          if (!passwordCheckRegex.test(newUser.password)) {
            toast.error('비밀번호는 6자 이상이어야 하며 숫자, 영문, 특수문자를 포함해야 합니다.');
            return;
          }
        }
        if (rePasswordRef.current) {
          if (rePasswordRef.current.value !== newUser.password) {
            toast.error('비밀번호가 일치하지 않습니다.');
            return;
          }
        }
        const userData = {
          userId: newUser.userId,
          nickname: newUser.nickname,
        };
        const res = await mutateAsync({ api: 'signValidate', userData });
        if (res === 200) {
          addNewUser();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 400) {
            const { field } = error.response.data;
            if (field === 'userId') {
              toast.error('중복된 ID 입니다.');
            } else if (field === 'nickname') {
              toast.error('중복된 닉네임입니다.');
            }
          }
        }
      }
    };
    validation();
  }, [newUser]);

  const debouncedSignup = useCallback(
    debounce(() => {
      setNewUser({
        nickname: nameRef.current?.value ?? null,
        userId: idRef.current?.value ?? null,
        password: passwordRef.current?.value ?? null,
      });
    }, 500),
    [],
  );

  const onSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedSignup();
  };

  const addNewUser = async () => {
    if (newUser.userId && newUser.nickname && newUser.password && checkbox?.checked) {
      try {
        const userData = {
          userId: newUser.userId,
          nickname: newUser.nickname,
          password: newUser.password,
        };
        const res = await mutateAsync({ api: 'register', userData });
        if (res === 201) {
          toast.success('가입이 완료되었습니다.');
          setNewUser({ nickname: null, userId: null, password: null });
          setTimeout(() => {
            closeSignupModal('signup');
            openSigninModal('signin');
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        toast.error('계정 생성 중에 오류가 발생하였습니다. 다시 시도해주세요.');
      }
    }
  };

  const children: React.ReactNode = (
    <>
      <h2 css={{ margin: '40px 0 40px', fontSize: '28px' }}>회원가입</h2>
      <form css={{ width: '330px' }} onSubmit={(e) => onSignup(e)}>
        <div css={idAndPasswordArea}>
          <Input id="nickname" css={idAndPassword} ref={nameRef} type="text" required />
          <label htmlFor="nickname">닉네임</label>
        </div>
        <div css={idAndPasswordArea}>
          <Input id="userId" css={idAndPassword} ref={idRef} type="text" required />
          <label htmlFor="userId">아이디</label>
        </div>
        <div css={idAndPasswordArea}>
          <Input id="password" css={idAndPassword} ref={passwordRef} type="password" required />
          <label htmlFor="password">비밀번호</label>
        </div>
        <div css={idAndPasswordArea}>
          <Input id="password2" css={idAndPassword} ref={rePasswordRef} type="password" required />
          <label htmlFor="password2">비밀번호 재입력</label>
        </div>
        <div css={{ fontSize: '14px' }}>
          <label
            css={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              accentColor: `${colors.primaryGreen}`,
            }}
            htmlFor="check"
          >
            <input css={{ cursor: 'pointer', marginRight: '10px' }} type="checkBox" id="check" />
            모두 확인 하셨습니까?
          </label>
        </div>
        <Button css={submitBtn} type="submit">
          가입하기
        </Button>
      </form>
      <p css={{ fontSize: '14px', marginBottom: '40px' }}>
        로그인하시겠습니까?
        <button css={modalMovementBtn} onClick={() => openSigninModal('signin')}>
          로그인
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
      {signupModal.modalName === 'signup' && signupModal.modalState ? (
        <Modal children={children} modalName="signup" />
      ) : null}
    </>
  );
};

export default Signup;
