/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { EllipsisVertical } from 'lucide-react';
const MenuDot = () => {
  return (
    <div css={menuDotStyle}>
      <EllipsisVertical />
    </div>
  );
};

const menuDotStyle = css`
  margin-top: 10px;
`;

export default MenuDot;
