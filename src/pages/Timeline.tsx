/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import SkeletonGridItem from '@/components/SkeletonGridItem';
import TitleHeader from '@/components/TitleHeader';
import VideoGridItem from '@/components/VideoGridItem';
import useUserStore from '@/stores/useUserStore';
import throttle from 'lodash/throttle';
import EmptyMessage from '@/components/EmptyMessage';
import Loading from '@/components/Loading';
import useFetchUserInformation from '@/hooks/useFetchUserInformation';

interface PlaylistData {
  id: string;
  title: string;
  userId: string;
  tags: string[];
  imgUrl: string;
  disclosureStatus: string;
  videoCount: number;
  nickname: string;
  profileImage: string;
}

const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(16);
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const user = useUserStore((state) => state.userInformation);
  const userId = user?.userId || null;

  const { userInformation } = useFetchUserInformation(userId);

  useEffect(() => {
    const fetchTimelineData = async () => {
      if (!userId) {
        setError('로그인된 사용자가 없습니다.');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/timeline/${userId}`);
        if (!response.ok) {
          throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const result = await response.json();
        setPlaylists(result.playlists);
        setHasMore(result.playlists.length > visibleItems);
        setLoading(false);
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

    fetchTimelineData();
  }, [userId, visibleItems]);

  useEffect(() => {
    const throttledHandleScroll = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
        setLoading(true);
        setTimeout(() => {
          setVisibleItems((prev) => prev + 8);
          setLoading(false);
          if (playlists.length <= visibleItems + 8) {
            setHasMore(false);
          }
        }, 500);
      }
    }, 500);

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [loading, hasMore, visibleItems, playlists.length]);

  return (
    <div css={containerStyle}>
      <TitleHeader
        profileImage={userInformation?.profileImage || '없음'}
        nickname={userInformation?.userName || ''}
        actionText="타임라인"
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
        {playlists.slice(0, visibleItems).map((item, index) => (
          <VideoGridItem
            key={index}
            videoId={item.id}
            title={item.title}
            user={item.userId}
            showDelete={true}
            showEdit={true}
            tags={item.tags}
            profileImage={item.profileImage}
            userName={item.nickname}
            userId={item.userId}
            imgUrl={item.imgUrl[0]}
            videoCount={item.videoCount}
          />
        ))}
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

const errorStyle = css`
  color: red;
  text-align: center;
  margin: 20px 0;
`;
const LoadingStyle = css`
  position: absolute;
  top: 40%;
  left: 60%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

export default Timeline;
