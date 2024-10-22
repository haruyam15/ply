/* eslint-disable react-hooks/exhaustive-deps */
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { useEffect } from 'react';
import Signin from '@/components/sign/Signin';
import Signup from '@/components/sign/Signup';
import { useNavigate } from 'react-router-dom';

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const user = useUserStore((state) => state.userInformation);
  const openSignin = useModalStore((state) => state.openModal);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userId === '') {
      navigate('/');
      openSignin('signin');
    }
  }, []);

  return (
    <>
      {user.userId !== '' ? (
        <>{children}</>
      ) : (
        <>
          <Signin />
          <Signup />
        </>
      )}
    </>
  );
};

export default ProtectedRoutes;
