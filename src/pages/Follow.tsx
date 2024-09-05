/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import Button from '@/components/Button';
import { Users, UserCheck } from 'lucide-react';

interface UserDetail {
  profileImage: string;
  userName: string;
  followers: number;
  myPlaylist: number;
  userId: string;
}

const Follow: React.FC = () => {
  const userInformation = useUserStore((state) => state.userInformation);
  const [followers, setFollowers] = useState<UserDetail[]>([]);
  const [following, setFollowing] = useState<UserDetail[]>([]);
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');

  const fetchFollowers = useCallback(async () => {
    try {
      if (userInformation.userId) {
        const response = await axios.get(`/api/followerPage/${userInformation.userId}`);
        setFollowers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch followers:', error);
    }
  }, [userInformation.userId]);

  const fetchFollowing = useCallback(async () => {
    try {
      if (userInformation.userId) {
        const response = await axios.get(`/api/followingPage/${userInformation.userId}`);
        setFollowing(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch following:', error);
    }
  }, [userInformation.userId]);

  useEffect(() => {
    if (userInformation.userId) {
      fetchFollowers();
      fetchFollowing();
    }
  }, [userInformation.userId, fetchFollowers, fetchFollowing]);

  const handleUnfollow = async (targetUserId: string) => {
    try {
      if (userInformation.userId) {
        await axios.delete(`/api/followDelete/${userInformation.userId}/${targetUserId}`);
        fetchFollowers();
        fetchFollowing();
      }
    } catch (error) {
      console.error('Failed to unfollow:', error);
    }
  };

  const renderUserList = (users: UserDetail[]) => (
    <div>
      {users.map((user, index) => (
        <div key={index} css={userItemStyle}>
          <img
            css={profileimageArea}
            src={user.profileImage || '/default-profile-image.jpg'}
            alt={user.userName}
          />
          <div css={userInfoStyle}>
            <h2 css={nicknameStyle}>{user.userName}</h2>
            <div css={userDetailsStyle}>
              <p>{user.userId}</p>
              <p>팔로워 {user.followers}</p>
              <p>플레이리스트 {user.myPlaylist}</p>
            </div>
            {activeTab === 'following' && (
              <Button css={profileEditOrFollowerBtn} onClick={() => handleUnfollow(user.userId)}>
                팔로우 취소
              </Button>
            )}
          </div>
        </div>
      ))}
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

const userItemStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding: 40px;
  background-color: ${colors.black};
  border-radius: 10px;
  transition: transform 0.3s;
`;

const profileimageArea = css`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${colors.gray};
  border: 2px solid ${colors.primaryGreen};
`;

const userInfoStyle = css`
  flex-grow: 1;
  margin-left: 30px;
`;

const nicknameStyle = css`
  font-size: 20px;
  font-weight: bold;
`;

const userDetailsStyle = css`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0 20px;
  color: ${colors.lightestGray};
`;

const profileEditOrFollowerBtn = css`
  width: 140px;
  height: 30px;
  background-color: ${colors.gray};
  color: ${colors.white};
  font-weight: 500;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover {
    background-color: #878787;
  }
`;

export default Follow;
