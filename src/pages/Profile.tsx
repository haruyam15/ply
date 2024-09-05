/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import UserProfile from '@/components/profile/UserProfile';
import { colors } from '@/styles/colors';
import { Video, Heart } from 'lucide-react';
import VideoGridItem from '@/components/VideoGridItem';
import useUserStore from '@/stores/useUserStore';

interface PlaylistItem {
  imgUrl: string[];
  title: string;
  userId: string;
  nickname: string;
  profileImage: string;
  tags: string[];
}

function Profile() {
  const { userInformation } = useUserStore();
  const [selectedTab, setSelectedTab] = useState('playlist');
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        let response;
        if (selectedTab === 'playlist') {
          response = await fetch(`/api/playlistPage/${userInformation.userId}`);
        } else {
          response = await fetch(`/api/likePage/${userInformation.userId}`);
        }

        if (!response.ok) {
          throw new Error('플레이리스트를 가져오는 중 오류 발생');
        }

        const data = await response.json();
        const filteredPlaylists: PlaylistItem[] =
          selectedTab === 'playlist' ? data.playlists : data.likedPlaylists;

        setPlaylists(filteredPlaylists);
      } catch (error) {
        console.error('플레이리스트를 가져오는 중 오류 발생:', error);
        setError('플레이리스트를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [selectedTab, userInformation.userId]);

  return (
    <div css={containerStyle}>
      <UserProfile />
      <div css={tabsStyle}>
        <button
          css={[tabStyle, selectedTab === 'playlist' && activeTabStyle]}
          onClick={() => setSelectedTab('playlist')}
        >
          <Video size={18} />내 플레이리스트
        </button>
        <button
          css={[tabStyle, selectedTab === 'likedPlaylist' && activeTabStyle]}
          onClick={() => setSelectedTab('likedPlaylist')}
        >
          <Heart size={18} />
          좋아요한 플레이리스트
        </button>
      </div>
      <div css={contentStyle}>
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div css={gridContainerStyle}>
            {playlists.map((item, index) => (
              <VideoGridItem
                key={index}
                videoId={item.imgUrl[0].split('/')[4]}
                title={item.title}
                user={item.userId}
                showEdit={false}
                showDelete={false}
                tags={item.tags || []}
                profileImage={item.profileImage || ''}
                userName={item.nickname || ''}
                userId={item.userId || ''}
                imgUrl={item.imgUrl[0]}
                videoCount={0}
                index={0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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

const containerStyle = css`
  margin: 0 20px;
`;

const contentStyle = css`
  margin-top: 20px;
`;

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
`;

export default Profile;
