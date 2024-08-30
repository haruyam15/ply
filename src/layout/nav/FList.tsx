/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import User from '@/components/User';
import useNavStore from '@/stores/useNavStore';
import { IUserData } from '@/types/userTypes';
import { Tab } from '@/types/navTypes';

interface IFListProps {
  tab: Tab;
}

const TESTURL = [
  'https://avatars.githubusercontent.com/u/131119152?s=64&v=4',
  'https://avatars.githubusercontent.com/u/143858798?s=64&v=4',
  'https://avatars.githubusercontent.com/u/147500032?s=64&v=4',
  'https://avatars.githubusercontent.com/u/169154369?s=64&v=4',
  'https://avatars.githubusercontent.com/u/110523397?v=4',
];
const user: IUserData = {
  information: {
    userid: 'haruyam15',
    profileimage: TESTURL[4],
    nickname: '하루얌',
    password: '1234',
  },
  like: ['playlist1', 'playlist2'],
  following: [
    {
      userid: 'Sonseongoh',
      nickname: '성오',
      profileimage: TESTURL[0],
    },
    {
      userid: 'dhkim511',
      nickname: '도형',
      profileimage: TESTURL[1],
    },
    {
      userid: 'love1ace',
      nickname: '동영',
      profileimage: TESTURL[2],
    },
    {
      userid: 'ssumanlife',
      nickname: '수민',
      profileimage: TESTURL[3],
    },
    {
      userid: 'abcde',
      nickname: 'hahaha',
      profileimage: TESTURL[4],
    },
  ],
  followers: [
    { userid: 'Sonseongoh', nickname: '성오', profileimage: TESTURL[0] },
    { userid: 'dhkim511', nickname: '도형', profileimage: TESTURL[1] },
    { userid: 'love1ace', nickname: '동영', profileimage: TESTURL[2] },
    { userid: 'ssumanlife', nickname: '수민', profileimage: TESTURL[3] },
  ],
  myplaylist: [],
};

function FList({ tab }: IFListProps) {
  const isExpand = useNavStore((state) => state.isExpand);
  return (
    <ul css={fList(isExpand)}>
      {user[tab].map((f, i) => (
        <li key={i}>
          <User
            profileimage={f.profileimage}
            nickname={f.nickname}
            userid={f.userid}
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
  li {
    margin-bottom: 5px;
    padding: 8px;
    box-sizing: border-box;
  }
  li:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }
  ${!isExpand &&
  `
		li{
			padding:4px
		}
  `}
`;
