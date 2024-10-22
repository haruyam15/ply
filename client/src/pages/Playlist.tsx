/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import SkeletonGridItem from '@/components/SkeletonGridItem';
import TitleHeader from '@/components/TitleHeader';
import VideoGridItem from '@/components/VideoGridItem';
import throttle from 'lodash/throttle';
import Loading from '@/components/Loading';
import useUserStore from '@/stores/useUserStore';
import EmptyMessage from '@/components/EmptyMessage';

interface PlaylistData {
  title: string;
  userId: string;
  tags: string[];
  imgUrl: string[];
  disclosureStatus: boolean;
  id: string;
  videoCount: number;
  nickname: string;
  profileImage: string;
}

interface UserInformation {
  profileImage: string;
  userName: string;
  userId: string;
}

const PlaylistPage: React.FC = () => {
  const { userIdParams } = useParams<{ userIdParams: string }>();
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
  const [titleNickName, setTitleNickName] = useState<string>('');
  const [titleProfileImage, setTitleProfileImage] = useState<string>('');

  const user = useUserStore((state) => state.userInformation);

  let userId: string | null = null;

  if (user.userId) {
    try {
      userId = user.userId;
    } catch (e) {
      console.error('로컬 스토리지에서 사용자 정보를 파싱하는 중 오류 발생:', e);
    }
  }

  useEffect(() => {
    const fetchUserInformation = async () => {
      if (!userId) {
        setError('로그인된 사용자가 없습니다.');
        return;
      }
      try {
        const response = await fetch(`http://15.164.228.103/api/profile/${userId}`);
        if (!response.ok) {
          throw new Error('사용자 정보를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        setUserInformation(data);
      } catch (e) {
        console.error('사용자 정보 요청 오류:', e);
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };
    fetchUserInformation();
  }, [userId]);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      if (!userId) {
        setError('로그인된 사용자가 없습니다.');
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`http://15.164.228.103/api/playlistPage/${userIdParams}`);
        if (!response.ok) {
          throw new Error('플레이리스트 데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const result = await response.json();

        // 필터링 로직 적용
        const filteredPlaylists = result.playlists.filter((playlist: PlaylistData) => {
          if (userInformation?.userId === userIdParams) {
            return playlist.userId === userIdParams;
          } else {
            setTitleNickName(playlist.nickname);
            setTitleProfileImage(playlist.profileImage);
            return playlist.userId === userIdParams && playlist.disclosureStatus === true;
          }
        });

        setPlaylists(filteredPlaylists);
      } catch (error) {
        if (error instanceof Error) {
          console.error('데이터 요청 오류:', error);
          setError(error.message);
        } else {
          console.error('알 수 없는 오류:', error);
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylistData();
  }, [userId, userInformation]);

  const handleDeleteItem = (index: number) => {
    setPlaylists((prevPlaylists) => prevPlaylists.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const throttledHandleScroll = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        setLoading(true);
        setTimeout(() => {
          setVisibleItems((prev) => prev + 8);
          setLoading(false);
        }, 500);
      }
    }, 500);
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [loading]);

  const isUserViewingOwnPage = userInformation?.userId === userIdParams;

  return (
    <div css={containerStyle}>
      <TitleHeader
        profileImage={titleProfileImage || userInformation?.profileImage || '없음'}
        nickname={titleNickName || userInformation?.userName || ''}
        actionText="플레이리스트"
        showAddPlaylistButton={isUserViewingOwnPage}
      />
      {error && <div css={errorStyle}>{error}</div>}
      {loading && (
        <>
          <div>
            <div css={LoadingStyle}>
              <Loading />
            </div>
            <div css={gridContainerStyle}>
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonGridItem key={index} />
              ))}
            </div>
          </div>
        </>
      )}
      {playlists.length === 0 && !loading && <EmptyMessage message="타임라인이 비어있습니다." />}
      <div css={gridContainerStyle}>
        {playlists.slice(0, visibleItems).map((item, index) => {
          return (
            <VideoGridItem
              key={index}
              videoId={item.id}
              title={item.title}
              user={item.userId}
              showDelete={isUserViewingOwnPage} // 자신의 페이지일 경우만 삭제 버튼 표시
              showEdit={isUserViewingOwnPage} // 자신의 페이지일 경우만 수정 버튼 표시
              showMenuDot={isUserViewingOwnPage} // 자신의 페이지일 경우만 메뉴 표시
              tags={item.tags}
              profileImage={item.profileImage}
              userName={item.nickname}
              userId={item.userId}
              imgUrl={item.imgUrl[0]}
              videoCount={item.videoCount}
              index={index}
              deleteItem={handleDeleteItem} // 삭제 콜백 함수 전달
            />
          );
        })}
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  margin: 0 auto;
  padding-top: 40px;
`;

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LoadingStyle = css`
  position: absolute;
  top: 40%;
  left: 60%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const errorStyle = css`
  color: red;
  text-align: center;
  margin: 20px 0;
`;

export default PlaylistPage;
