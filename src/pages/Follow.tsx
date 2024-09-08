/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import { Users, UserCheck } from 'lucide-react';
import useUserStore from '@/stores/useUserStore';

interface UserDetail {
  profileImage: string;
  userName: string;
  followers: number;
  myPlaylist: number;
  userId: string;
  isFollowing?: boolean;
}

const Follow: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'following' ? 'following' : 'followers';
  const [followers, setFollowers] = useState<UserDetail[]>([]);
  const [following, setFollowing] = useState<UserDetail[]>([]);
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab);
  const loggedInUser = useUserStore((state) => state.userInformation);
  const navigate = useNavigate();

  const fetchFollowers = useCallback(async () => {
    try {
      if (userId) {
        const response = await axios.get(`/api/followerPage/${userId}`);
        setFollowers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch followers:', error);
    }
  }, [userId]);

  const fetchFollowing = useCallback(async () => {
    try {
      if (userId) {
        const response = await axios.get(`/api/followingPage/${userId}`);
        const updatedFollowing = response.data.map((user: UserDetail) => ({
          ...user,
          isFollowing: true,
        }));
        setFollowing(updatedFollowing);
      }
    } catch (error) {
      console.error('Failed to fetch following:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchFollowers();
      fetchFollowing();
    }
  }, [userId, fetchFollowers, fetchFollowing]);

  const handleFollowToggle = async (targetUserId: string, currentlyFollowing: boolean) => {
    try {
      if (currentlyFollowing) {
        await axios.delete(`/api/followDelete/${loggedInUser.userId}/${targetUserId}`);
      } else {
        await axios.post(`/api/follow/${loggedInUser.userId}/${targetUserId}`);
      }

      const updatedUsers = activeTab === 'following' ? following : followers;
      const setUsers = activeTab === 'following' ? setFollowing : setFollowers;

      setUsers(
        updatedUsers.map((user) =>
          user.userId === targetUserId ? { ...user, isFollowing: !currentlyFollowing } : user,
        ),
      );
    } catch (error) {
      console.error('팔로우 상태를 변경하는 중 오류 발생:', error);
    }
  };

  const handleProfileClick = (targetUserId: string) => {
    navigate(`/profile/${targetUserId}`);
  };

  const renderUserList = (users: UserDetail[]) => (
    <div>
      {users.length === 0 ? (
        <p css={emptyMessageStyle}>
          {activeTab === 'followers' ? '아직 팔로워가 없습니다.' : '아직 팔로잉한 유저가 없습니다.'}
        </p>
      ) : (
        users.map((user) => (
          <div
            key={user.userId}
            css={userProfileContainer}
            onClick={() => handleProfileClick(user.userId)}
          >
            <img
              css={profileImageArea}
              src={user.profileImage}
              alt={`${user.userName}'s profile`}
            />
            <div css={profileInfoArea}>
              <div css={headerArea}>
                <div css={nameArea}>
                  <h1 css={nicknameStyle}>{user.userName}</h1>
                  <p css={idStyle}>{user.userId}</p>
                </div>
                {loggedInUser.userId !== user.userId && (
                  <button
                    css={followBtn(user.isFollowing)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollowToggle(user.userId, user.isFollowing || false);
                    }}
                  >
                    {user.isFollowing ? '팔로잉 중' : '팔로우'}
                  </button>
                )}
              </div>
              <div css={statsArea}>
                <Link
                  to={`/playlist/${user.userId}`}
                  css={statItem}
                  onClick={(e) => e.stopPropagation()}
                >
                  플레이리스트 <span css={statValue}>{user.myPlaylist}</span>
                </Link>
                <Link
                  to={`/follow/${user.userId}?tab=follower`}
                  css={statItem}
                  onClick={(e) => e.stopPropagation()}
                >
                  팔로워 <span css={statValue}>{user.followers}</span>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      <div css={tabsStyle}>
        <button
          css={[tabStyle, activeTab === 'followers' && activeTabStyle]}
          onClick={() => setActiveTab('followers')}
        >
          <Users size={24} />
          팔로워 {followers.length}
        </button>
        <button
          css={[tabStyle, activeTab === 'following' && activeTabStyle]}
          onClick={() => setActiveTab('following')}
        >
          <UserCheck size={24} />
          팔로잉 {following.length}
        </button>
      </div>
      {activeTab === 'followers' ? renderUserList(followers) : renderUserList(following)}
    </div>
  );
};

export default Follow;

const userProfileContainer = css`
  display: flex;
  align-items: center;
  padding: 40px;
  background-color: ${colors.black};
  margin: 40px 0;
  border-radius: 20px;
  cursor: pointer; /* 전체 컨테이너 클릭 가능하게 설정 */
`;

const profileImageArea = css`
  width: 230px;
  height: 230px;
  border-radius: 50%;
  border: 2px solid ${colors.gray};
  margin-right: 60px;
`;

const profileInfoArea = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const headerArea = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const nameArea = css`
  flex: 1;
`;

const nicknameStyle = css`
  font-size: 32px;
  margin: 0;
  color: ${colors.white};
`;

const idStyle = css`
  font-size: 20px;
  color: ${colors.gray};
  margin-top: 10px;
`;

const statsArea = css`
  display: flex;
  gap: 40px;
  margin-top: 40px;
`;

const statItem = css`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${colors.white};
  font-size: 18px;
`;

const statValue = css`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.primaryGreen};
  margin-left: 12px;
`;

const followBtn = (isFollowing: boolean | undefined) => css`
  width: 100px;
  height: 30px;
  margin-right: 660px;
  background-color: ${isFollowing ? colors.gray : colors.primaryGreen};
  color: ${colors.white};
  font-weight: 500;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${isFollowing ? colors.primaryGreen : colors.gray};
    color: ${colors.white};
  }
`;

const tabsStyle = css`
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
  margin-bottom: 30px;
  background-color: ${colors.black};
  border-radius: 10px;
  overflow: hidden;
`;

const tabStyle = css`
  flex: 1;
  padding: 15px 0;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.lightGray};
  text-align: center;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const activeTabStyle = css`
  color: ${colors.primaryGreen};
  border-bottom: 2px solid ${colors.primaryGreen};
`;

const emptyMessageStyle = css`
  text-align: center;
  margin-top: 140px;
  font-size: 20px;
  color: ${colors.gray};
`;
