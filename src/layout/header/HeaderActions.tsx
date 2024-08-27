/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';
import Signin from '@/components/sign/Signin';
import Signup from '@/components/sign/Signup';
import User from '@/components/User';
import useSignModalStore from '@/stores/useSignModalStore';
import useUserStore from '@/stores/useUserStore';

function HeaderActions() {
  const openSigninModal = useSignModalStore((state) => state.openModal);
  const user = useUserStore((state) => state.userInformation);
  const { profileimage, nickname, userid } = user.information;

  return (
    <div css={headerActions}>
      {userid === '' ? (
        <>
          <div onClick={() => openSigninModal('signin')}>
            <Button>로그인</Button>
          </div>
          <Signin />
          <Signup />
        </>
      ) : (
        <Link to={'/profile'}>
          <div className="user-info">
            <User profileImage={profileimage} nickName={nickname} userId={userid} size="md" />
          </div>
        </Link>
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
  padding-right: 20px;
  box-sizing: border-box;
  align-items: center;
`;
