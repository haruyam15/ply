/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import ProfileEditModal from './ProfileEditModal';
import axios from 'axios';

const UserProfile: React.FC = () => {
  const profileModal = useModalStore((state) => state.modals);
  const openProfileModal = useModalStore((state) => state.openModal);

  const user = useUserStore((state) => state.userInformation);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/profilePage/${user.userId}`);
        if (response.data) {
          if (
            user.followers !== response.data.followers ||
            user.myPlaylists !== response.data.myPlaylistCount
          ) {
            setUser({
              ...user,
              followers: response.data.followers,
              myPlaylists: response.data.myPlaylistCount,
            });
          }
        }
      } catch (error) {
        console.error('프로필 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    if (user.userId) {
      fetchProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.userId]);

  const { profileImage, nickname, userId } = user;

  const handleOpenProfileModal = () => {
    openProfileModal('profileEdit');
  };

  return (
    <div css={userProfileContainer}>
      <img css={profileimageArea} src={profileImage} alt="Profile" />
      <div css={profileTextArea}>
        <h1 css={nicknameStyle}>{nickname}</h1>
        <div css={infoContainer}>
          <p>{userId}</p>
          <Link to="/follow" css={infoLink}>
            팔로워 {user.followers?.length || 0}
          </Link>
          <Link to="/playlist" css={infoLink}>
            플레이리스트 {user.myPlaylists?.length || 0}
          </Link>
        </div>
        {user?.userId === userId ? (
          <button css={profileEditOrFollowerBtn} onClick={handleOpenProfileModal}>
            프로필 수정
          </button>
        ) : (
          <button css={profileEditOrFollowerBtn}>팔로우</button>
        )}
      </div>
      {profileModal.modalName === 'profileEdit' && profileModal.modalState && <ProfileEditModal />}
    </div>
  );
};

export default UserProfile;

const userProfileContainer = css`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 20px;
  margin-top: 80px;
`;

const profileimageArea = css`
  width: 230px;
  height: 230px;
  border-radius: 50%;
  border: 2px solid ${colors.primaryGreen};
`;

const profileTextArea = css`
  margin-left: 30px;
`;

const nicknameStyle = css`
  font-size: 32px;
`;

const infoContainer = css`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  color: ${colors.lightestGray};
`;

const infoLink = css`
  color: ${colors.lightestGray};
  text-decoration: none;
  &:hover {
    color: ${colors.white};
  }
`;

const profileEditOrFollowerBtn = css`
  width: 100px;
  height: 30px;
  margin-top: 20px;
  background-color: ${colors.gray};
  color: ${colors.white};
  font-weight: 500;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryGreen};
  }
`;
