/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import SkeletonGridItem from '@/components/SkeletonGridItem';
import TitleHeader from '@/components/TitleHeader';
import VideoGridItem from '@/components/VideoGridItem';
import useUserStore from '@/stores/useUserStore';
import throttle from 'lodash/throttle'; // lodash의 throttle 가져오기

interface PlaylistData {
  id: string;
  title: string;
  userId: string;
  tags: string[];
  imgUrl: string; // imgUrl 속성 추가
  disclosureStatus: string;
  videoCount: number;
}

interface UserInformation {
  profileImage: string;
  userName: string;
  userId: string;
}

const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(16);
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
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
        const response = await fetch(`/api/profile/${userId}`);
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
          console.log('추가 데이터 로드 완료, 아이템 수:', visibleItems);
          if (playlists.length <= visibleItems + 8) {
            setHasMore(false);
          }
        }, 1000);
      }
    }, 500); // 500ms마다 한 번만 호출

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [loading, hasMore, visibleItems, playlists.length]);

  return (
    <div css={containerStyle}>
      <TitleHeader
        profileImage={userInformation?.profileImage || '없음'}
        nickname={userInformation?.userName || '손성오'}
        actionText="타임라인"
      />

      {error && <div css={errorStyle}>{error}</div>}

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
            profileImage={userInformation?.profileImage || ''}
            userName={userInformation?.userName || ''}
            userId={userInformation?.userId || ''}
            imgUrl={item.imgUrl} // imgUrl을 VideoGridItem에 전달
            videoCount={item.videoCount}
          />
        ))}
        {loading && Array.from({ length: 8 }).map((_, index) => <SkeletonGridItem key={index} />)}
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

export default Timeline;
