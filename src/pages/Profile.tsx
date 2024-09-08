/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import UserProfile from '@/components/profile/UserProfile';
import { colors } from '@/styles/colors';
import { Video, Heart } from 'lucide-react';
import VideoGridItem from '@/components/VideoGridItem';
import useUserStore from '@/stores/useUserStore';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import Button from '@/components/Button';

interface PlaylistData {
  title: string;
  userId: string;
  tags: string[];
  imgUrl: string[];
  disclosureStatus: boolean;
  id: string;
  videoCount: number;
}

function Profile() {
  const userInformation = useUserStore((state) => state.userInformation);
  const [selectedTab, setSelectedTab] = useState('playlist');
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams() as { userId: string };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        let response;
        if (selectedTab === 'playlist') {
          response = await fetch(`/api/playlistPage/${userId}`);
        } else {
          response = await fetch(`/api/likePage/${userId}`);
        }

        if (!response.ok) {
          throw new Error('플레이리스트를 가져오는 중 오류 발생');
        }

        const data = await response.json();
        const filteredPlaylists: PlaylistData[] =
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
  }, [selectedTab, userId]);

  const handleMoreClick = () => {
    if (selectedTab === 'playlist') {
      navigate(`/playlist/${userId}`);
    } else {
      navigate(`/like/${userId}`);
    }
  };

  const handleDeleteItem = (index: number) => {
    setPlaylists((prevPlaylists) => prevPlaylists.filter((_, i) => i !== index));
  };

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
          <div css={emptyMessageStyle}>
            <Loading />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : playlists.length === 0 ? (
          <div css={emptyMessageStyle}>
            {selectedTab === 'playlist' ? (
              <p>아직 플레이리스트가 없습니다. 플레이리스트를 만들어보세요!</p>
            ) : (
              <p>좋아요한 플레이리스트가 없습니다.</p>
            )}
          </div>
        ) : (
          <>
            <div css={gridContainerStyle}>
              {playlists.slice(0, 8).map((item, index) => (
                <VideoGridItem
                  key={index}
                  videoId={item.id}
                  title={item.title}
                  user={item.userId}
                  showDelete={userInformation.userId === item.userId}
                  showEdit={userInformation.userId === item.userId}
                  tags={item.tags}
                  profileImage={userInformation?.profileImage || ''}
                  userName={item.userId}
                  userId={item.userId}
                  imgUrl={item.imgUrl[0]}
                  videoCount={item.videoCount}
                  index={index}
                  deleteItem={handleDeleteItem}
                />
              ))}
            </div>
            {playlists.length > 8 && (
              <div css={moreButtonContainerStyle}>
                <Button size="md" background={false} onClick={handleMoreClick}>
                  더보기
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

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

const emptyMessageStyle = css`
  text-align: center;
  font-size: 20px;
  color: ${colors.gray};
  padding: 40px 0;
  margin-top: 80px;
`;

const moreButtonContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;
