/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { IUser } from '@/stores/useUserStore';
import { colors } from '@/styles/colors';

interface ProfileProps {
  user: IUser;
}

interface RealUserData {
  userid: string;
  profileimage: string;
  nickname: string;
  password: string;
  followers: string[];
  following: string[];
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { profileimage, nickname, userid } = user.information;
  const storageUserData = localStorage.getItem('userInformation');
  const realUserData: RealUserData | null = storageUserData ? JSON.parse(storageUserData) : null;
  console.log(realUserData);

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
          <button css={profileEditOrFollowerBtn}>프로필 수정</button>
        ) : (
          <button css={profileEditOrFollowerBtn}>팔로우</button>
        )}
      </div>
    </div>
  );
};

export default Profile;

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
