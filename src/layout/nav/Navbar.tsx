/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Banner from '@/layout/nav/Banner';
import FollowingFollowers from '@/layout/nav/FollowingFollowers';
import Logout from '@/layout/nav/Logout';
import NavList from '@/layout/nav/NavList';
import NavTop from '@/layout/nav/NavTop';
import useNavStore from '@/stores/useNavStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';

function Navbar() {
  const isExpand = useNavStore((state) => state.isExpand);
  const user = useUserStore((state) => state.userInformation);

  return (
    <nav css={nav(isExpand)}>
      <div className="nav-inner">
        <NavTop />
        <div className="scroll-area">
          <NavList />
          <FollowingFollowers />
          {isExpand && <Banner />}
          {user?.userId ? <Logout /> : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

const nav = (isExpand: boolean) => css`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  box-sizing: content-box;
  width: ${isExpand ? '240px' : '78px'};
  z-index: 12000;

  .nav-inner {
    background-color: ${colors.black};
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    width: 100%;
    z-index: 13000;

    .scroll-area {
      overflow-y: auto;
      scrollbar-width: none;
    }
  }
`;
