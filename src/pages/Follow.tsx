/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/useUserStore';
import { colors } from '@/styles/colors';

interface FollowerDetail {
  userid: string;
  profileimage: string;
  nickname: string;
}

const Follow: React.FC = () => {
  const { userInformation, fetchFollowers } = useUserStore();
  const [followerDetails, setFollowerDetails] = useState<FollowerDetail[]>([]);

  useEffect(() => {
    const getFollowers = async () => {
      const followers = await fetchFollowers();
      const details = await Promise.all(
        followers.map(async (followerId) => {
          try {
            const response = await axios.get(`/api/user/profile?userid=${followerId}`);
            return {
              userid: followerId,
              profileimage: response.data.profileimage,
              nickname: response.data.nickname,
            };
          } catch (error) {
            console.error(`Failed to fetch details for user ${followerId}:`, error);
            return null;
          }
        }),
      );
      setFollowerDetails(details.filter((detail): detail is FollowerDetail => detail !== null));
    };
    getFollowers();
  }, [fetchFollowers]);

  return (
    <div css={{ margin: '0 40px' }}>
      {followerDetails.map((follower, index) => (
        <div
          key={index}
          css={{ display: 'flex', justifyContent: 'left', alignItems: 'center', margin: '80px' }}
        >
          <img css={profileimageArea} src={follower.profileimage || '/default-profile-image.jpg'} />
          <div css={{ marginLeft: '30px' }}>
            <h1 css={{ fontSize: '32px' }}>{follower.nickname}</h1>
            <div
              css={{
                width: '300px',
                display: 'flex',
                justifyContent: 'space-between',
                margin: '30px 5px 20px',
                color: `${colors.white}`,
              }}
            >
              <p>@{follower.userid}</p>
              <Link to="/follow" css={{ color: `${colors.white}` }}>
                팔로워 {userInformation.followers.length}
              </Link>
              <Link to="/playlist" css={{ color: `${colors.white}` }}>
                플레이리스트 {userInformation.following.length}
              </Link>
            </div>
            <button css={profileEditOrFollowerBtn}>팔로우</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Follow;

const profileimageArea = css`
  width: 230px;
  height: 230px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${colors.gray};
`;

const profileEditOrFollowerBtn = css`
  width: 100px;
  height: 30px;
  margin-top: 10px;
  background-color: ${colors.primaryGreen};
  color: ${colors.white};
  font-weight: 800;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #878787;
  }
`;
