/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Heart, History, House, Video } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useNavStore from '@/stores/useNavStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import { useEffect, useState } from 'react';

const NavDataInit = [
  { route: '', name: '홈', active: true, icon: House },
  { route: 'timeline', name: '타임라인', active: false, icon: History },
  { route: 'playlist', name: '플레이리스트', active: false, icon: Video },
  { route: 'like', name: '좋아요', active: false, icon: Heart },
];

function NavList() {
  const pathName = useLocation().pathname;
  const [navData, setNavData] = useState(NavDataInit);
  const isExpand = useNavStore((state) => state.isExpand);
  const loggedInUser = useUserStore((state) => state.userInformation);

  useEffect(() => {
    const currentPath = pathName.split('/')[1];
    setNavData((prev) =>
      prev.map((nav) => ({
        ...nav,
        active: nav.route === currentPath,
      })),
    );
  }, [pathName]);

  return (
    <ul css={navList(isExpand)}>
      {navData.map((nav, i) => {
        const Icon = nav.icon;
        return (
          <li key={i} className={nav.active ? 'active' : ''}>
            <Link
              to={
                nav.route === 'playlist' && loggedInUser.userId
                  ? `/playlist/${loggedInUser.userId}`
                  : nav.route === 'like' && loggedInUser.userId
                    ? `/like/${loggedInUser.userId}` // 좋아요 경로 수정
                    : `/${nav.route}`
              }
            >
              <Icon />
              <span>{nav.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavList;

const navList = (isExpand: boolean) => css`
  padding: 18px;
  li {
    border-radius: 6px;
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
				margin-left:0;
        display:block
			}
      }
    `}
  }

  li:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
  }

  li.active {
    background: rgba(255, 255, 255, 0.1);
  }
`;
