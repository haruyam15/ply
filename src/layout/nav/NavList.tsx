/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Heart, History, House, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

import useNavStore from '@/stores/useNavStore';
import { colors } from '@/styles/colors';

function NavList() {
  const isExpand = useNavStore((state) => state.isExpand);
  return (
    <ul css={navList(isExpand)}>
      <li>
        <Link to={'/'}>
          <House />
          <span>홈</span>
        </Link>
      </li>
      <li>
        <Link to={'/timeline'}>
          <History />
          <span>타임라인</span>
        </Link>
      </li>
      <li>
        <Link to={'/playlist'}>
          <Video />
          <span>플레이리스트</span>
        </Link>
      </li>
      <li>
        <Link to={'/Like'}>
          <Heart />
          <span>좋아요</span>
        </Link>
      </li>
    </ul>
  );
}

export default NavList;

const navList = (isExpand: boolean) => css`
  padding: 18px;
  li {
    a {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: 18px;
      font-weight: bold;
      color: ${colors.lightestGray};
      span {
        margin-left: 10px;
        padding-top: 3px;
      }
    }

    .svg-playlist {
      padding-left: 3px;
    }

    ${!isExpand &&
    `
      a {
			padding-left: 0;
			display: block;
			font-size: 10px;
			line-height: 15px;
			padding: 6px 0 4px;
			text-align: center;
			box-sizing: border-box;
			span{
				margin-left:0
			}
      }
    `}
  }

  li:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }
`;
