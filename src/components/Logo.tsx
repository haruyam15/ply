/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <h1 css={logo}>
      <Link to="/">
        <img src="/assets/images/logo.png" alt="Logo" />
      </Link>
    </h1>
  );
}

export default Logo;

const logo = css`
  position: fixed;
  top: 0;
  left: 63px;
  padding-top: 15px;
  box-sizing: border-box;
  z-index: 13000;

  img {
    width: 110px;
  }

  a {
    display: block;
  }
`;
