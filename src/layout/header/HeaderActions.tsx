/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';
import Signin, { realUserData } from '@/components/sign/Signin';
import Signup from '@/components/sign/Signup';
import User from '@/components/User';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';

function HeaderActions() {
  const openSigninModal = useModalStore((state) => state.openModal);
  const user = useUserStore((state) => state.userInformation);

  return (
    <div css={headerActions}>
      {realUserData?.userId === user.userId ? (
        <Link to={'/profile'}>
          <div className="user-info">
            <User
              profileImage={user.profileImage}
              nickname={user.nickname}
              userId={user.userId}
              size="md"
            />
          </div>
        </Link>
      ) : (
        <>
          <div onClick={() => openSigninModal('signin')}>
            <Button>로그인</Button>
          </div>
          <Signin />
          <Signup />
        </>
      )}
    </div>
  );
}

export default HeaderActions;

const headerActions = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 3px;
  padding-right: 30px;
  box-sizing: border-box;
  align-items: center;
`;
