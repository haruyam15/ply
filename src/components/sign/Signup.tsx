/** @jsxImportSource @emotion/react */
import { useRef, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
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

import 'react-toastify/dist/ReactToastify.css';
import useUserDataFetch from '@/hooks/useUserDataFetch';

export interface SignupData {
  nickname?: string | null;
  userId: string | null;
  password?: string | null;
}

const Signup: React.FC = () => {
  const signinModal = useModalStore((state) => state.modals);
  const openSigninModal = useModalStore((state) => state.openModal);
  const [newUser, setNewUser] = useState<SignupData>({
    nickname: null,
    userId: null,
    password: null,
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useUserDataFetch();

  const onSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewUser({
      nickname: nameRef.current?.value ?? null,
      userId: idRef.current?.value ?? null,
      password: passwordRef.current?.value ?? null,
    });
  };

  const checkbox = document.getElementById('check') as HTMLInputElement;

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
          openSigninModal('signin');
        }
      } catch (error) {
        console.error(error);
        toast.error('계정 생성 중에 오류가 발생하였습니다. 다시 시도해주세요.');
      }
    }
  };

  const validation = async () => {
    if (newUser.nickname && newUser.userId && !checkbox?.checked && signinModal.modalState) {
      toast.error('모두 확인하였는지 체크해주세요.');
    } else {
      try {
        const userData = {
          userId: newUser.userId,
          nickname: newUser.nickname,
        };
        const res = await mutateAsync({ api: 'validate', userData });
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
    }
  };

  const children: React.ReactNode = (
    <>
      <h2 css={{ margin: '40px 0 40px', fontSize: '28px' }}>회원가입</h2>
      <form css={{ width: '330px' }} onSubmit={(e) => onSignup(e)}>
        <div css={idAndPasswordArea}>
          <Input css={idAndPassword} ref={nameRef} type="text" required />
          <label>닉네임</label>
        </div>
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
        <Button css={submitBtn} type="submit" onClick={validation}>
          가입하기
        </Button>
      </form>
      <p css={{ fontSize: '14px', marginBottom: '40px' }}>
        로그인하시겠습니까?
        <button css={modalMovementBtn} onClick={() => openSigninModal('signin')}>
          로그인 화면으로 돌아가기
        </button>
      </p>
      <ToastContainer
        position="bottom-center"
        limit={1}
        closeButton={false}
        autoClose={2000}
        hideProgressBar
      />
    </>
  );
  return (
    <>
      {signinModal.modalName === 'signup' && signinModal.modalState ? (
        <Modal children={children} modalName="signup" />
      ) : null}
    </>
  );
};

export default Signup;
