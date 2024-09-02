/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import User from '@/components/User';
import useNavStore from '@/stores/useNavStore';
import { Tab } from '@/types/navTypes';
import { IUserData } from '@/types/userTypes';
import Button from '@/components/Button'; // 새로운 Button 컴포넌트 가져오기

const TESTURL = [
  'https://avatars.githubusercontent.com/u/131119152?s=64&v=4',
  'https://avatars.githubusercontent.com/u/143858798?s=64&v=4',
  'https://avatars.githubusercontent.com/u/147500032?s=64&v=4',
  'https://avatars.githubusercontent.com/u/169154369?s=64&v=4',
];

const user: IUserData = {
  userId: 'haruyam15',
  profileImage: TESTURL[4],
  nickname: '하루얌',
  password: '1234',
  like: ['playlist1', 'playlist2'],
  following: [
    {
      userId: 'Sonseongoh',
      nickname: '성오',
      profileImage: TESTURL[0],
    },
    {
      userId: 'dhkim511',
      nickname: '도형',
      profileImage: TESTURL[1],
    },
    {
      userId: 'love1ace',
      nickname: '동영',
      profileImage: TESTURL[2],
    },
    {
      userId: 'ssumanlife',
      nickname: '수민',
      profileImage: TESTURL[3],
    },
    {
      userId: 'abcde',
      nickname: 'hahaha',
      profileImage: TESTURL[4],
    },
  ],
  followers: [
    { userId: 'Sonseongoh', nickname: '성오', profileImage: TESTURL[0] },
    { userId: 'dhkim511', nickname: '도형', profileImage: TESTURL[1] },
    { userId: 'love1ace', nickname: '동영', profileImage: TESTURL[2] },
    { userId: 'ssumanlife', nickname: '수민', profileImage: TESTURL[3] },
  ],
  myplaylist: [],
};

function FList({ tab }: FListProps) {
  const isExpand = useNavStore((state) => state.isExpand);
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/follow');
  };

  const displayedUsers = user[tab].slice(0, 4);
  const hasMore = user[tab].length > 3;

  return (
    <>
      <ul css={fList(isExpand)}>
        {displayedUsers.map((f, i) => (
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
      {hasMore && (
        <div css={buttonContainer}>
          <Button size={isExpand ? 'sm' : 'md'} onClick={handleMoreClick}>
            {isExpand ? '더보기' : '...'}
          </Button>
        </div>
      )}
    </>
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
    li {
      padding: 4px;
    }
  `}
`;

const buttonContainer = css`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

interface FListProps {
  tab: Tab;
}
