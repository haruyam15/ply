/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Link, useParams } from 'react-router-dom';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import ProfileEditModal from './ProfileEditModal';
import axios from 'axios';
import { FollowingFollowers } from '@/types/userTypes';

interface ProfileData {
  profileImage: string;
  userName: string;
  followers: FollowingFollowers[];
  following: FollowingFollowers[];
  playlists?: {
    id: string;
    title: string;
    userId: string;
    tags: string[];
    imgUrl: string[];
    disclosureStatus: boolean;
    videoCount: number;
  }[];
  userId: string;
}

const UserProfile: React.FC = () => {
  const profileModal = useModalStore((state) => state.modals);
  const openProfileModal = useModalStore((state) => state.openModal);
  const { userId: urlUserId } = useParams<{ userId: string }>();

  const loggedInUser = useUserStore((state) => state.userInformation);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileResponse, playlistResponse, followCheckResponse] = await Promise.all([
          axios.get<ProfileData>(`/api/profilePage/${urlUserId}`),
          axios.get<{ playlists: ProfileData['playlists'] }>(`/api/playlistPage/${urlUserId}`),
          axios.get(`/api/followCheck/${loggedInUser.userId}/${urlUserId}`),
        ]);

        setProfileData({
          ...profileResponse.data,
          playlists: playlistResponse.data.playlists,
          userId: urlUserId || loggedInUser.userId,
        });

        setIsFollowing(followCheckResponse.data.followStatus);
      } catch (error) {
        console.error('프로필 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchProfileData();
  }, [urlUserId, loggedInUser]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`/api/followDelete/${loggedInUser.userId}/${urlUserId}`);
        setIsFollowing(false);
      } else {
        await axios.post(`/api/follow/${loggedInUser.userId}/${urlUserId}`);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('팔로우 상태를 변경하는 중 오류 발생:', error);
    }
  };

  const handleOpenProfileModal = () => {
    openProfileModal('profileEdit');
  };

  const playlistCount = profileData?.playlists?.length || 0;

  return (
    <div css={userProfileContainer}>
      <img css={profileImageArea} src={profileData?.profileImage} alt="Profile" />
      <div css={profileInfoArea}>
        <div css={headerArea}>
          <div css={nameArea}>
            <h1 css={nicknameStyle}>{profileData?.userName}</h1>
            <p css={idStyle}>{profileData?.userId}</p>
          </div>
          {loggedInUser.userId === urlUserId ? (
            <button css={profileEditBtn} onClick={handleOpenProfileModal}>
              프로필 수정
            </button>
          ) : (
            <button css={followBtn(isFollowing)} onClick={handleFollowToggle}>
              {isFollowing ? '팔로잉 중' : '팔로우'}
            </button>
          )}
        </div>
        <div css={statsArea}>
          <Link to={`/playlist/${urlUserId}`} css={statItem}>
            플레이리스트 <span css={statValue}>{playlistCount}</span>
          </Link>
          <Link to={`/follow/${urlUserId}`} css={statItem}>
            팔로워 <span css={statValue}>{profileData?.followers?.length || 0}</span>
          </Link>
          <Link to={`/follow/${urlUserId}`} css={statItem}>
            팔로잉 <span css={statValue}>{profileData?.following?.length || 0}</span>
          </Link>
        </div>
      </div>
      {profileModal.modalName === 'profileEdit' && profileModal.modalState && <ProfileEditModal />}
    </div>
  );
};

export default UserProfile;

const userProfileContainer = css`
  display: flex;
  align-items: center;
  padding: 40px;
  background-color: ${colors.black};
  margin: 40px 0;
  border-radius: 20px;
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
  align-items: center;
  margin-bottom: 15px;
`;

const nameArea = css`
  margin-right: 20px;
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

const profileEditBtn = css`
  width: 100px;
  height: 30px;
  margin-left: 320px;
  align-self: flex-start;
  background-color: ${colors.gray};
  color: ${colors.white};
  font-weight: 500;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryGreen};
    color: ${colors.white};
  }
`;

const followBtn = (isFollowing: boolean) => css`
  width: 100px;
  height: 30px;
  margin-left: 320px;
  align-self: flex-start;
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
