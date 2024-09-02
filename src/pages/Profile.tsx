/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import UserProfile from '@/components/profile/UserProfile';
import { colors } from '@/styles/colors';

function Profile() {
  return (
    <div css={{ margin: '0 40px' }}>
      <UserProfile />
      <div css={[menuBox, { position: 'relative' }]}>
        <div css={{ width: '50%', position: 'relative', marginRight: '30px' }}>
          <p css={{ position: 'absolute', right: '0' }}>플레이리스트</p>
        </div>
        <div
          css={{
            width: '50%',
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '30px',
          }}
        >
          <p>좋아요</p>
          <p>더보기</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;

const menuBox = css`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.borderGray};
  box-sizing: border-box;
  padding: 5px 0;
  font-size: 18px;
  font-weight: 500;
`;
