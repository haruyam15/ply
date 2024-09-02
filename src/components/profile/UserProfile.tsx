/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import useModalStore from '@/stores/useModalStore';
import { IUser } from '@/stores/useUserStore';
import { colors } from '@/styles/colors';
import ProfileEditModal from './ProfileEditModal';
import { IUserInformation } from '@/types/userTypes';

interface ProfileProps {
  user: IUser;
}

export interface RealUserData {
  userId: string;
  profileimage: string;
  nickname: string;
  password: string;
  followers: string[];
  following: string[];
}

const UserProfile: React.FC<ProfileProps> = ({ user }) => {
  const profileModal = useModalStore((state) => state.modals);
  const openProfileModal = useModalStore((state) => state.openModal);
  const closeProfileModal = useModalStore((state) => state.closeModal);

  const { setUser } = useUserStore();
  const { profileImage, nickname, userId } = user;
  const storageUserData = localStorage.getItem('userInformation');
  const realUserData: RealUserData | null = storageUserData ? JSON.parse(storageUserData) : null;

  const [newProfileImage, setNewProfileImage] = useState<string>(profileImage);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [newPassword, setNewPassword] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleOpenProfileModal = () => {
    openProfileModal('profileEdit');
  };

  const handleCloseProfileModal = () => closeProfileModal('profileEdit');

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('/api/updateUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          profileimage: newProfileImage,
          password: newPassword,
          nickname: newNickname,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setUser({
          userId,
          password: newPassword || user.password,
          profileImage: newProfileImage,
          nickname: newNickname,
          likes: user.likes,
          followers: user.followers,
          following: user.following,
          myPlaylists: user.myPlaylists,
        });

        localStorage.setItem(
          'userInformation',
          JSON.stringify({
            userId,
            profileImage: newProfileImage,
            nickname: newNickname,
            password: newPassword || user.password,
            followers: user.followers,
            following: user.following,
          }),
        );

        handleCloseProfileModal();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleImageEdit = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setNewProfileImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    handleProfileUpdate();
    setShowConfirm(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
      <img css={profileimageArea} src={profileimage} alt="Profile" />
      <div css={{ marginLeft: '30px' }}>
        <h1 css={{ fontSize: '32px' }}>{nickname}</h1>
        <div
          css={{
            width: '300px',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px 5px 20px',
            color: `${colors.lightestGray}`,
          }}
        >
          <p>@{userId}</p>
          <Link to="/follow" css={{ color: `${colors.lightestGray}` }}>
            팔로워 {user.followers?.length || 0}
          </Link>
          <Link to="/playlist" css={{ color: `${colors.lightestGray}` }}>
            플레이리스트 {user.following?.length || 0}
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
