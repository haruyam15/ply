/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import Button from '@/components/Button';

interface UserDetail {
  profileImage: string;
  userName: string;
  followers: number;
  myPlaylist: number;
  userId: string;
}

const Follow: React.FC = () => {
  const { userInformation } = useUserStore();
  const [followers, setFollowers] = useState<UserDetail[]>([]);
  const [following, setFollowing] = useState<UserDetail[]>([]);
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`/api/followerPage/${userInformation.userId}`);
        setFollowers(response.data);
      } catch (error) {
        console.error('Failed to fetch followers:', error);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`/api/followingPage/${userInformation.userId}`);
        setFollowing(response.data);
      } catch (error) {
        console.error('Failed to fetch following:', error);
      }
    };

    fetchFollowers();
    fetchFollowing();
  }, [userInformation.userId]);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(`/api/followerPage/${userInformation.userId}`);
      setFollowers(response.data);
    } catch (error) {
      console.error('Failed to fetch followers:', error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(`/api/followingPage/${userInformation.userId}`);
      setFollowing(response.data);
    } catch (error) {
      console.error('Failed to fetch following:', error);
    }
  };

  const handleFollowToggle = async (targetUserId: string, isFollowing: boolean) => {
    try {
      if (isFollowing) {
        await axios.delete(`/api/followDelete/${userInformation.userId}/${targetUserId}`);
      } else {
        await axios.post(`/api/follow/${userInformation.userId}/${targetUserId}`);
      }
      fetchFollowers();
      fetchFollowing();
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    }
  };

  const renderUserList = (users: UserDetail[]) => (
    <div>
      {users.map((user, index) => (
        <div key={index} css={userItemStyle}>
          <img
            css={profileImageStyle}
            src={user.profileImage || '/default-profile-image.jpg'}
            alt={user.userName}
          />
          <div css={userInfoStyle}>
            <h2>{user.userName}</h2>
            <p>
              팔로워 {user.followers} · 플레이리스트 {user.myPlaylist}
            </p>
          </div>
          <Button
            onClick={() =>
              handleFollowToggle(
                user.userId,
                following.some((f) => f.userId === user.userId),
              )
            }
          >
            {following.some((f) => f.userId === user.userId) ? '언팔로우' : '팔로우'}
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <div css={containerStyle}>
      <div css={tabsStyle}>
        <button
          css={[tabStyle, activeTab === 'followers' && activeTabStyle]}
          onClick={() => setActiveTab('followers')}
        >
          팔로워 {followers.length}
        </button>
        <button
          css={[tabStyle, activeTab === 'following' && activeTabStyle]}
          onClick={() => setActiveTab('following')}
        >
          팔로잉 {following.length}
        </button>
      </div>
      {activeTab === 'followers' ? renderUserList(followers) : renderUserList(following)}
    </div>
  );
};

const containerStyle = css`
  margin: 0 40px;
  color: ${colors.white};
`;

const tabsStyle = css`
  display: flex;
  margin-bottom: 20px;
`;

const tabStyle = css`
  background: none;
  border: none;
  color: ${colors.lightGray};
  font-size: 18px;
  padding: 10px 20px;
  cursor: pointer;
`;

const activeTabStyle = css`
  color: ${colors.primaryGreen};
  border-bottom: 2px solid ${colors.primaryGreen};
`;

const userItemStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const profileImageStyle = css`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const userInfoStyle = css`
  flex-grow: 1;
  h2 {
    margin: 0;
    font-size: 18px;
  }
  p {
    margin: 5px 0 0;
    font-size: 14px;
    color: ${colors.lightGray};
  }
`;

export default Follow;
