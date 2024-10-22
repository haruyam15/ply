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
import Button from '@/components/Button';
import { If } from '@/components/IfElse';
import { UserPlus, UserRoundCheck } from 'lucide-react';

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
          axios.get<ProfileData>(`http://15.164.228.103/api/profilePage/${urlUserId}`),
          axios.get<{ playlists: ProfileData['playlists'] }>(
            `http://15.164.228.103/api/playlistPage/${urlUserId}`,
          ),
          axios.get(`http://15.164.228.103/api/followCheck/${loggedInUser.userId}/${urlUserId}`),
        ]);

        const publicPlaylists = playlistResponse.data.playlists?.filter(
          (playlist) => playlist.disclosureStatus === true,
        );

        setProfileData({
          ...profileResponse.data,
          playlists: publicPlaylists,
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
        await axios.delete(
          `http://15.164.228.103/api/followDelete/${loggedInUser.userId}/${urlUserId}`,
        );
        setIsFollowing(false);
      } else {
        await axios.post(`http://15.164.228.103/api/follow/${loggedInUser.userId}/${urlUserId}`);
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
        </div>
        <div css={statsArea}>
          <Link to={`/playlist/${urlUserId}`} css={statItem}>
            플레이리스트 <span css={statValue}>{playlistCount}</span>
          </Link>
          <Link to={`/follow/${urlUserId}?tab=followers`} css={statItem}>
            팔로워 <span css={statValue}>{profileData?.followers?.length || 0}</span>
          </Link>
          <Link to={`/follow/${urlUserId}?tab=following`} css={statItem}>
            팔로잉 <span css={statValue}>{profileData?.following?.length || 0}</span>
          </Link>
        </div>
        <div css={buttonContainer}>
          {loggedInUser.userId === urlUserId ? (
            <Button onClick={handleOpenProfileModal} size="lg">
              프로필 수정
            </Button>
          ) : (
            <If test={isFollowing}>
              <If.Then>
                <Button size="lg" onClick={handleFollowToggle}>
                  <UserRoundCheck size={20} /> 팔로잉
                </Button>
              </If.Then>
              <If.Else>
                <Button size="lg" onClick={handleFollowToggle} bgColor={colors.primaryGreen}>
                  <UserPlus size={20} /> 팔로우
                </Button>
              </If.Else>
            </If>
          )}
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
  border: 2px solid ${colors.primaryGreen};
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

const buttonContainer = css`
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
`;
