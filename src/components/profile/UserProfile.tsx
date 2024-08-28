/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { css, Global } from '@emotion/react';
import { Link } from 'react-router-dom';

import Confirm, { ConfirmStyles } from '@/components/Confirm'; // ConfirmStyles 가져오기
import { IUser } from '@/stores/useUserStore';
import { colors } from '@/styles/colors';

interface ProfileProps {
  user: IUser;
}

export interface RealUserData {
  userid: string;
  profileimage: string;
  nickname: string;
  password: string;
  followers: string[];
  following: string[];
}

const UserProfile: React.FC<ProfileProps> = ({ user }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleProfileEditClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // 여기서 실제 수정 작업을 호출하거나 처리할 수 있습니다.
  };

  const handleClose = () => {
    setShowConfirm(false);
  };

  const { profileimage, nickname, userid } = user.information;
  const storageUserData = localStorage.getItem('userInformation');
  const realUserData: RealUserData | null = storageUserData ? JSON.parse(storageUserData) : null;

  return (
    <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
      <img css={profileimageArea} src={profileimage} />
      <div css={{ marginLeft: '30px' }}>
        <h1 css={{ fontSize: '32px' }}>{nickname}</h1>
        <div
          css={{
            width: '300px',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px 5px 20px',
            color: `${colors.lightestGray}`,
          }}
        >
          <p>@{userid}</p>
          <Link to="/follow" css={{ color: `${colors.lightestGray}` }}>
            팔로워 {user.followers.length}
          </Link>
          <Link to="/playlist" css={{ color: `${colors.lightestGray}` }}>
            플레이리스트 {user.following.length}
          </Link>
        </div>
        {realUserData?.userid === userid ? (
          <button onClick={handleProfileEditClick} css={profileEditOrFollowerBtn}>
            프로필 수정
          </button>
        ) : (
          <button css={profileEditOrFollowerBtn}>팔로우</button>
        )}
      </div>
      {showConfirm && (
        <Confirm
          title="프로필을 수정하시겠습니까?"
          text=""
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      )}
      <Global styles={ConfirmStyles} />
    </div>
  );
};

export default UserProfile;

const profileimageArea = css`
  width: 230px;
  height: 230px;
  border-radius: 50%;
`;

const profileEditOrFollowerBtn = css`
  width: 100px;
  height: 30px;
  background-color: ${colors.gray};
  color: ${colors.white};
  font-weight: 500;
  border: none;
  border-radius: 15px;
  :hover {
    background-color: #878787;
  }
`;
