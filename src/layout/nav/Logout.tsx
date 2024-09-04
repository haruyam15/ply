/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import useNavStore from '@/stores/useNavStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';

function Logout() {
  const isExpand = useNavStore((state) => state.isExpand);
  const clearStoreage = useUserStore.persist.clearStorage;
  const navigate = useNavigate();

  const handleClick = () => {
    clearStoreage();
    navigate('/');
    location.reload();
  };
  return (
    <div css={logout(isExpand)}>
      <button className="btn-logout" onClick={handleClick}>
        <LogOut />
        <span>Logout</span>
      </button>
    </div>
  );
}
export default Logout;

const logout = (isExpand: boolean) => css`
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;
  padding: 18px;
  margin-top: 10px;
  &::before {
    background-color: ${colors.darkestGray};
    content: '';
    height: 1px;
    left: 21px;
    position: absolute;
    right: 21px;
    top: 0;
  }
  .btn-logout {
    display: flex;
    flex: 1;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    color: ${colors.white};
    span {
      font-size: 15px;
      margin-left: 10px;
    }
  }
  .btn-logout:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }

  ${!isExpand &&
  `
	.btn-logout {
		flex-direction: column;
		span{
			margin-left:0;
			font-size:10px;
		}
	}
  `}
`;
