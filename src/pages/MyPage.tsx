/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Profile from '@/components/myPage/Profile';

function MyPage() {
  return (
    <div css={{ margin: '0 40px' }}>
      <Profile />
      <div css={[menuBox, { position: 'relative' }]}>
        <div css={{ width: '50%', position: 'relative', marginRight: '30px' }}>
          <p css={{ position: 'absolute', right: '0' }}>Playlist</p>
        </div>
        <div
          css={{
            width: '50%',
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '30px',
          }}
        >
          <p>Like</p>
          <p>더보기</p>
        </div>
      </div>
    </div>
  );
}

export default MyPage;

const menuBox = css`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
  padding: 5px 0;
  font-size: 18px;
  font-weight: 500;
`;
