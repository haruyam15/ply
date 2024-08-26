/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import User from '@/layout/nav/User';
import useNavStore from '@/stores/useNavStore';

const TESTURL = [
  'https://avatars.githubusercontent.com/u/131119152?s=64&v=4',
  'https://avatars.githubusercontent.com/u/143858798?s=64&v=4',
  'https://avatars.githubusercontent.com/u/147500032?s=64&v=4',
  'https://avatars.githubusercontent.com/u/169154369?s=64&v=4',
  'https://avatars.githubusercontent.com/u/110523397?v=4',
];
const user: UserData = {
  information: { userId: 'haruyam15', profileimage: TESTURL[4], nickName: '하루얌' },
  subscription: ['playlist1', 'playlist2'],
  following: [
    {
      userId: 'Sonseongoh',
      nickName: '성오',
      profileimage: TESTURL[0],
    },
    {
      userId: 'dhkim511',
      nickName: '도형',
      profileimage: TESTURL[1],
    },
    {
      userId: 'love1ace',
      nickName: '동영',
      profileimage: TESTURL[2],
    },
    {
      userId: 'ssumanlife',
      nickName: '수민',
      profileimage: TESTURL[3],
    },
    {
      userId: 'abcde',
      nickName: 'hahaha',
      profileimage: TESTURL[4],
    },
  ],
  followers: [
    { userId: 'Sonseongoh', nickName: '성오', profileimage: TESTURL[0] },
    { userId: 'dhkim511', nickName: '도형', profileimage: TESTURL[1] },
    { userId: 'love1ace', nickName: '동영', profileimage: TESTURL[2] },
    { userId: 'ssumanlife', nickName: '수민', profileimage: TESTURL[3] },
  ],
};

function FList({ tab }: FListProps) {
  const isExpand = useNavStore((state) => state.isExpand);
  return (
    <ul css={fList(isExpand)}>
      {user[tab].map((f, i) => (
        <li key={i}>
          <User
            profileimage={f.profileimage}
            nickname={f.nickName}
            userId={f.userId}
            onlyImage={!isExpand}
          />
        </li>
      ))}
    </ul>
  );
}

export default FList;

const fList = (isExpand: boolean) => css`
  padding-bottom: 5px;
  ${!isExpand &&
  `
	.f-list {
		li:hover {
			cursor: pointer;
			background: rgba(255, 255, 255, 0.1);
			border-radius: 6px;
		}
	}
  `}
  li {
    margin-bottom: 5px;
  }
`;

interface FListProps {
  tab: 'following' | 'followers';
}

interface UserData {
  information: UserInformation;
  subscription: string[];
  following: UserInformation[];
  followers: UserInformation[];
}

interface UserInformation {
  userId: string;
  profileimage: string;
  nickName: string;
}
