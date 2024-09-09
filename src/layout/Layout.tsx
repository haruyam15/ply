/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Logo from '@/components/Logo';
import useResponsiveNav from '@/hooks/useResponsivNav';
import Header from '@/layout/header/Header';
import Navbar from '@/layout/nav/Navbar';
import useNavStore from '@/stores/useNavStore';
import { colors } from '@/styles/colors';

function Layout() {
  const isExpand = useNavStore((state) => state.isExpand);
  useResponsiveNav();
  return (
    <div css={wrap} className="wrap">
      <Header />
      <Navbar />
      <Logo />
      <div css={container(isExpand)} className="container">
        <div className="page-wrap" css={page}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;

const wrap = css`
  min-height: 100vh;
  min-width: 950px;
  background-color: ${colors.black};
`;

const container = (isExpand: boolean) => css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 60px;
  padding-left: ${isExpand ? '240px' : '78px'};
  min-height: 100vh;
  box-sizing: border-box;
`;
const page = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  padding: 0 20px 20px;
  box-sizing: border-box;
`;
