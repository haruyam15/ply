/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import SkeletonGridItem from '@/components/SkeletonGridItem';
import TitleHeader from '@/components/TitleHeader';
import VideoGridItem from '@/components/VideoGridItem';
import { useParams } from 'react-router-dom';
import throttle from 'lodash/throttle';
import EmptyMessage from '@/components/EmptyMessage';
import Loading from '@/components/Loading';
import useFetchUserInformation from '@/hooks/useFetchUserInformation';

interface LikedPlaylistData {
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

const Like: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(false);
  const [likedPlaylists, setLikedPlaylists] = useState<LikedPlaylistData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId: string }>();
  const { userInformation } = useFetchUserInformation(userId);

  useEffect(() => {
    const fetchLikedPlaylists = async () => {
      if (!userId) {
        setError('유저 ID가 없습니다.');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://plyserver.kro.kr/api/likePage/${userId}`);
        if (!response.ok) {
          throw new Error('좋아요한 플레이리스트 데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const result = await response.json();
        setLikedPlaylists(result.likedPlaylists);
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

    fetchLikedPlaylists();
  }, [userId]);

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

  return (
    <div css={containerStyle}>
      <TitleHeader
        profileImage={userInformation?.profileImage || '없음'}
        nickname={userInformation?.userName || ''}
        actionText="좋아요"
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
      {/* 좋아요한 플레이리스트가 비어있을 경우 EmptyMessage 컴포넌트 사용 */}
      {likedPlaylists.length === 0 && !loading && (
        <EmptyMessage message="좋아요한 플레이리스트가 없습니다." />
      )}
      <div css={gridContainerStyle}>
        {likedPlaylists.slice(0, visibleItems).map((item, index) => (
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
            index={index}
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

export default Like;
