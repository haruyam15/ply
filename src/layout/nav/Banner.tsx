/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/colors';
import { css } from '@emotion/react';

function Banner() {
  return (
    <div css={banner}>
      <img src="/assets/images/banner.png" alt="" />
    </div>
  );
}

export default Banner;

const banner = css`
  padding: 30px 18px 18px;
  position: relative;
  &::before {
    background-color: ${colors.borderGray};
    content: '';
    height: 1px;
    left: 21px;
    position: absolute;
    right: 21px;
    top: 0;
  }
`;
