/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import User from '@/components/User';
import useNavStore from '@/stores/useNavStore';
import { Tab } from '@/types/navTypes';
import Button from '@/components/Button';
import useUserStore from '@/stores/useUserStore';
import { IUserData, FollowingFollowers } from '@/types/userTypes';
import { UserX } from 'lucide-react';
import { If } from '@/components/IfElse';

function FList({ tab }: FListProps) {
  const isExpand = useNavStore((state) => state.isExpand);
  const navigate = useNavigate();
  const userInformation = useUserStore((state) => state.userInformation) as IUserData;

  const handleMoreClick = () => {
    navigate(`/follow?tab=${tab}`);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const users: FollowingFollowers[] =
    tab === 'followers' ? userInformation.followers : userInformation.following;

  if (users.length === 0) {
    return (
      <ul css={fList(isExpand)} className="empty">
        <li>
          <UserX />
        </li>
      </ul>
    );
  }
  const isMore = users.length > 5;

  return (
    <>
      <ul css={fList(isExpand)}>
        {users.map((f, i) => (
          <li key={i}>
            <User
              profileImage={f.profileImage}
              nickname={f.nickname}
              userId={f.userId}
              onlyImage={!isExpand}
              onClick={() => handleUserClick(f.userId)}
            />
          </li>
        ))}
      </ul>
      <If test={isMore}>
        <If.Then>
          <div css={buttonContainer}>
            <Button size={isExpand ? 'sm' : 'sm'} onClick={handleMoreClick}>
              {isExpand ? '더보기' : '...'}
            </Button>
          </div>
        </If.Then>
      </If>
    </>
  );
}

export default FList;

const fList = (isExpand: boolean) => css`
  padding-bottom: 5px;
  &.empty {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    li:hover {
      cursor: initial;
      background: none;
      border-radius: 0;
    }
  }
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
  margin-top: 20px;
`;

interface FListProps {
  tab: Tab;
}
