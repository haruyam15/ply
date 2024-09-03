/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import ProfileEditModal from './ProfileEditModal';

const UserProfile: React.FC = () => {
  const profileModal = useModalStore((state) => state.modals);
  const openProfileModal = useModalStore((state) => state.openModal);

  const user = useUserStore((state) => state.userInformation);
  const storageUserData = localStorage.getItem('userInformation');
  const realUserData = storageUserData ? JSON.parse(storageUserData) : null;

  const { profileImage, nickname, userId } = user;

  const handleOpenProfileModal = () => {
    openProfileModal('profileEdit');
  };

  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        margin: '20px',
        marginTop: '40px',
      }}
    >
      <img css={profileimageArea} src={profileImage} alt="Profile" />
      <div css={{ marginLeft: '30px' }}>
        <h1 css={{ fontSize: '32px' }}>{nickname}</h1>
        <div
          css={{
            width: '300px',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px 0 20px',
            color: `${colors.lightestGray}`,
          }}
        >
          <p>@{userId}</p>
          <Link to="/follow" css={{ color: `${colors.lightestGray}` }}>
            팔로워 {user.followers?.length || 0}
          </Link>
          <Link to="/playlist" css={{ color: `${colors.lightestGray}` }}>
            플레이리스트 {user.myPlaylists?.length || 0}
          </Link>
        </div>
        {realUserData?.userId === userId ? (
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

const profileimageArea = css`
  width: 230px;
  height: 230px;
  border-radius: 50%;
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
    background-color: #878787;
  }
`;
