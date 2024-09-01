/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import SkeletonGridItem from '@/components/SkeletionGridItem';
import TitleHeader from '@/components/TitleHeader';
import VideoGridItem from '@/components/VideoGridItem';

interface PlaylistData {
  id: string;
  title: string;
  userId: string;
  tags: string[];
  imgUrl: string;
  disclosureStatus: string;
}

const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(16);
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true); // 추가할 데이터가 있는지 여부를 나타내는 상태

  const userInformationString = localStorage.getItem('userInformation');

  let userId: string | null = null;

  if (userInformationString) {
    try {
      const userInformation = JSON.parse(userInformationString); // JSON 파싱
      userId = userInformation.userid; // userId 추출
    } catch (e) {
      console.error('로컬 스토리지에서 사용자 정보를 파싱하는 중 오류 발생:', e);
    }
  }

  useEffect(() => {
    const fetchTimelineData = async () => {
      if (!userId) {
        setError('로그인된 사용자가 없습니다.');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/timeline/${userId}`); // 동적으로 사용자 ID 사용
        if (!response.ok) {
          throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const result = await response.json();
        setPlaylists(result.playlists);
        setHasMore(result.playlists.length > visibleItems); // 추가할 데이터가 있는지 여부 결정
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
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
        setLoading(true);
        setTimeout(() => {
          setVisibleItems((prev) => prev + 8);
          setLoading(false);
          console.log('추가 데이터 로드 완료, 아이템 수:', visibleItems);
          if (playlists.length <= visibleItems + 8) {
            setHasMore(false); // 추가 데이터가 더 이상 없는 경우 무한 스크롤 중지
          }
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, visibleItems, playlists.length]); // 종속성 배열에 추가된 상태들

  return (
    <div css={containerStyle}>
      <TitleHeader profileImage="없음" nickname="손성오" actionText="Timeline" />

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
          />
        ))}
        {loading && Array.from({ length: 8 }).map((_, index) => <SkeletonGridItem key={index} />)}
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  max-width: 1200px;
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
