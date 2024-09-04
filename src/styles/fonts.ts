import { css } from '@emotion/react';

import Black from '/assets/fonts/Pretendard-Black.woff2';
import Bold from '/assets/fonts/Pretendard-Bold.woff2';
import ExtraBold from '/assets/fonts/Pretendard-ExtraBold.woff2';
import ExtraLight from '/assets/fonts/Pretendard-ExtraLight.woff2';
import Light from '/assets/fonts/Pretendard-Light.woff2';
import Medium from '/assets/fonts/Pretendard-Medium.woff2';
import Regular from '/assets/fonts/Pretendard-Regular.woff2';
import SemiBold from '/assets/fonts/Pretendard-SemiBold.woff2';
import Thin from '/assets/fonts/Pretendard-Thin.woff2';

const fontStyles = css`
  @font-face {
    font-family: 'Pretendard';
    src: url(${Black}) format('woff');
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${ExtraBold}) format('woff');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Bold}) format('woff');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${SemiBold}) format('woff');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Medium}) format('woff');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Regular}) format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Light}) format('woff');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${ExtraLight}) format('woff');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Thin}) format('woff');
    font-weight: 100;
    font-style: normal;
  }
`;

export default fontStyles;
