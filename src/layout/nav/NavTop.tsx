/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Menu } from 'lucide-react';

import useNavStore from '@/stores/useNavStore';
import { colors } from '@/styles/colors';

function NavTop() {
  const { isExpand, toggleExpand } = useNavStore();
  const handleNavExpand = () => {
    toggleExpand(!isExpand);
  };
  return (
    <div css={btnWrap}>
      <button onClick={handleNavExpand}>
        <Menu size={30} />
      </button>
    </div>
  );
}
export default NavTop;

const btnWrap = css`
  box-sizing: border-box;
  button {
    color: ${colors.white};
    padding: 20px 4px 6px 23px;
  }
`;
