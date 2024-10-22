/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import { Users, UserCheck, UserRoundCheck, UserPlus } from 'lucide-react';
import useUserStore from '@/stores/useUserStore';
import TitleHeader from '@/components/TitleHeader';
import Loading from '@/components/Loading';
import { If } from '@/components/IfElse';

interface Playlist {
  id: string;
  title: string;
  userId: string;
  tags: string[];
  imgUrl: string[];
  disclosureStatus: boolean;
  videoCount: number;
}

interface UserDetail {
  profileImage: string;
  userName: string;
  followers: number;
  myPlaylistCount: number;
  userId: string;
  isFollowing?: boolean;
  followingCount?: number;
}

const calculatePlaylistCount = async (userId: string): Promise<number> => {
  try {
    const { playlists }: { playlists: Playlist[] } = await fetch(
      `https://plyserver.kro.kr/api/playlistPage/${userId}`,
    ).then((response) => response.json());
    return playlists.filter((playlist) => playlist.disclosureStatus).length;
  } catch (error) {
    console.error('플레이리스트 개수를 가져오는 중 오류 발생:', error);
    return 0;
  }
};

const getFollowingCount = async (userId: string): Promise<number> => {
  try {
    const data: UserDetail[] = await fetch(
      `https://plyserver.kro.kr/api/followingPage/${userId}`,
    ).then((response) => response.json());
    return data.length;
  } catch (error) {
    console.error('팔로잉 수를 가져오는 중 오류 발생:', error);
    return 0;
  }
};

const Follow: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();

  const initialTab = searchParams.get('tab') || 'followers';

  const [followers, setFollowers] = useState<UserDetail[]>([]);
  const [following, setFollowing] = useState<UserDetail[]>([]);
  const [userInfo, setUserInfo] = useState<UserDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(
    initialTab as 'followers' | 'following',
  );

  const loggedInUser = useUserStore((state) => state.userInformation);
  const navigate = useNavigate();

  const fetchUserInfo = useCallback(async () => {
    if (!userId) return;
    try {
      const data: UserDetail = await fetch(
        `https://plyserver.kro.kr/api/profilePage/${userId}`,
      ).then((response) => response.json());

      const playlistCount = await calculatePlaylistCount(userId);
      const followingCount = await getFollowingCount(userId);

      setUserInfo({
        ...data,
        myPlaylistCount: playlistCount,
        followingCount: followingCount,
      });
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  }, [userId]);

  const checkFollowStatus = async (targetUserId: string): Promise<boolean> => {
    try {
      const { followStatus }: { followStatus: boolean } = await fetch(
        `https://plyserver.kro.kr/api/followCheck/${loggedInUser.userId}/${targetUserId}`,
      ).then((response) => response.json());
      return followStatus;
    } catch (error) {
      console.error('Failed to check follow status:', error);
      return false;
    }
  };

  const fetchFollowers = useCallback(async () => {
    if (!userId) return;
    try {
      const data: UserDetail[] = await fetch(
        `https://plyserver.kro.kr/api/followerPage/${userId}`,
      ).then((response) => response.json());

      const updatedFollowers = await Promise.all(
        data.map(async (follower) => ({
          ...follower,
          isFollowing: await checkFollowStatus(follower.userId),
          myPlaylistCount: await calculatePlaylistCount(follower.userId),
          followingCount: await getFollowingCount(follower.userId),
        })),
      );
      setFollowers(updatedFollowers);
    } catch (error) {
      console.error('Failed to fetch followers:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, loggedInUser]);

  const fetchFollowing = useCallback(async () => {
    if (!userId) return;
    try {
      const data: UserDetail[] = await fetch(
        `https://plyserver.kro.kr/api/followingPage/${userId}`,
      ).then((response) => response.json());

      const updatedFollowing = await Promise.all(
        data.map(async (user) => ({
          ...user,
          isFollowing: await checkFollowStatus(user.userId),
          myPlaylistCount: await calculatePlaylistCount(user.userId),
          followingCount: await getFollowingCount(user.userId),
        })),
      );
      setFollowing(updatedFollowing);
    } catch (error) {
      console.error('Failed to fetch following:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, loggedInUser]);

  const handleFollowToggle = async (targetUserId: string, currentlyFollowing: boolean) => {
    try {
      if (currentlyFollowing) {
        await fetch(
          `https://plyserver.kro.kr/api/followDelete/${loggedInUser.userId}/${targetUserId}`,
          {
            method: 'DELETE',
          },
        );
      } else {
        await fetch(`https://plyserver.kro.kr/api/follow/${loggedInUser.userId}/${targetUserId}`, {
          method: 'POST',
        });
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
              </div>
              <div css={statsArea}>
                <Link
                  to={`/playlist/${user.userId}`}
                  css={statItem}
                  onClick={(e) => e.stopPropagation()}
                >
                  플레이리스트 <span css={statValue}>{user.myPlaylistCount}</span>{' '}
                </Link>
                <Link
                  to={`/follow/${user.userId}?tab=followers`}
                  css={statItem}
                  onClick={(e) => e.stopPropagation()}
                >
                  팔로워 <span css={statValue}>{user.followers}</span>
                </Link>
                <Link
                  to={`/follow/${user.userId}?tab=following`}
                  css={statItem}
                  onClick={(e) => e.stopPropagation()}
                >
                  팔로잉 <span css={statValue}>{user.followingCount}</span>
                </Link>
              </div>
              {loggedInUser.userId !== user.userId && (
                <button
                  css={followBtn(user.isFollowing)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollowToggle(user.userId, user.isFollowing || false);
                  }}
                >
                  <If test={user.isFollowing as boolean}>
                    <If.Then>
                      <UserRoundCheck size={20} /> 팔로잉
                    </If.Then>
                    <If.Else>
                      <UserPlus size={20} /> 팔로우
                    </If.Else>
                  </If>
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  useEffect(() => {
    fetchUserInfo();
    fetchFollowers();
    fetchFollowing();
  }, [userId, fetchUserInfo, fetchFollowers, fetchFollowing]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'following' || tab === 'followers') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!userInfo) {
    return <Loading />;
  }

  return (
    <div css={containerStyle}>
      <TitleHeader
        profileImage={userInfo.profileImage}
        nickname={userInfo.userName}
        actionText={activeTab === 'followers' ? '팔로워' : '팔로잉'}
      />
      <div css={tabsStyle}>
        <button
          css={[tabStyle, activeTab === 'followers' && activeTabStyle]}
          onClick={() => {
            setActiveTab('followers');
            navigate(`/follow/${userId}?tab=followers`, { replace: true });
          }}
        >
          <Users size={24} /> 팔로워 {followers.length}
        </button>
        <button
          css={[tabStyle, activeTab === 'following' && activeTabStyle]}
          onClick={() => {
            setActiveTab('following');
            navigate(`/follow/${userId}?tab=following`, { replace: true });
          }}
        >
          <UserCheck size={24} /> 팔로잉 {following.length}
        </button>
      </div>
      {activeTab === 'followers' ? renderUserList(followers) : renderUserList(following)}
    </div>
  );
};

export default Follow;

const containerStyle = css`
  width: 100%;
  margin: 0 auto;
  padding-top: 40px;
`;

const userProfileContainer = css`
  display: flex;
  align-items: center;
  padding: 40px;
  background-color: ${colors.black};
  margin: 40px 0;
  border-radius: 20px;
  cursor: pointer;
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
`;

const headerArea = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const nameArea = css`
  margin-right: 20px;
  display: flex;
  gap: 20px;
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
`;

const statItem = css`
  display: flex;
  justify-content: flex-start;
  text-decoration: none;
  color: ${colors.white};
  font-size: 18px;
  margin-top: 10px;
`;

const statValue = css`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.primaryGreen};
  margin-left: 12px;
`;

const followBtn = (isFollowing: boolean | undefined) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  font-size: 15px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  font-weight: 700;
  padding: 0 13px;
  color: ${colors.white};
  cursor: pointer;
  margin-top: 20px;
  svg {
    margin-right: 5px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  ${!isFollowing &&
  `
    background-color:${colors.primaryGreen};
    color:${colors.black};
    &:hover{
      background-color: #029c5a
    }
  `}
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
