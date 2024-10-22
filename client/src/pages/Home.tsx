/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SkeletonGridItem from '@/components/SkeletonGridItem';
import VideoGridItem from '@/components/VideoGridItem';
import { colors } from '@/styles/colors';
import useUserStore from '@/stores/useUserStore';
import throttle from 'lodash/throttle';

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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [visibleItems] = useState(8); // 타임라인의 초기 항목 수
  const [exploreVisibleItems, setExploreVisibleItems] = useState(12); // 탐색의 초기 항목 수
  const [loading, setLoading] = useState(true); // 초기 로딩 상태
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [exploreData, setExploreData] = useState<PlaylistData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMoreExplore, setHasMoreExplore] = useState(true); // 탐색 데이터의 무한 스크롤 상태 관리
  const user = useUserStore((state) => state.userInformation);

  useEffect(() => {
    if (user.userId) {
      fetchTimelineData(user.userId); // 타임라인 데이터를 가져옴
    }
  }, [user.userId]); // 타임라인 데이터는 userId가 변경될 때만 호출

  useEffect(() => {
    fetchExploreData(); // 탐색 데이터는 컴포넌트가 마운트될 때 한 번만 호출
  }, []); // 초기 마운트 시 한 번만 호출되므로 의존성 배열은 빈 배열

  useEffect(() => {
    const throttledHandleScroll = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMoreExplore) {
        loadMoreItems(); // 추가 데이터 로드
      }
    }, 500);

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [hasMoreExplore, exploreVisibleItems, exploreData.length]); // 탐색 데이터와 무한 스크롤 관련 의존성 배열

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setExploreVisibleItems((prev) => prev + 8);
      setLoading(false);

      if (exploreData.length <= exploreVisibleItems + 8) {
        setHasMoreExplore(false);
      }
    }, 500);
  };

  const fetchTimelineData = async (userId: string) => {
    try {
      const response = await fetch(`http://15.164.228.103/api/timeline/${userId}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
      }
      const result = await response.json();
      setPlaylists(result.playlists);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('데이터 요청 오류:', error.message);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } else {
        console.error('알 수 없는 오류:', error);
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchExploreData = async () => {
    try {
      const response = await fetch('http://15.164.228.103/api/search');
      if (!response.ok) {
        throw new Error('탐색 데이터를 가져오는 중 오류가 발생했습니다.');
      }
      const data = await response.json();
      setExploreData(data);
      setHasMoreExplore(data.length > exploreVisibleItems); // 더 가져올 탐색 데이터가 있는지 확인
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('탐색 데이터 요청 오류:', error.message);
        setError('탐색 데이터를 가져오는 중 오류가 발생했습니다.');
      } else {
        console.error('알 수 없는 오류:', error);
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const navigateToTimeline = () => {
    navigate('/timeline');
  };

  if (error) {
    return null;
  }

  return (
    <div css={containerStyle}>
      <div css={[carouselStyle, slickArrowStyle]}>
        <Slider {...settings}>
          {['kjM1eO9eBss', 'ft70sAYrFyY', 'dsgan8jxdV0', 'nb1wIbEghD0', 'T-mHuIdFIEc'].map(
            (videoId, index) => (
              <div key={index} css={slideStyle}>
                <img
                  src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                  alt={`캐러셀 이미지`}
                  css={thumbnailStyle}
                />
              </div>
            ),
          )}
        </Slider>
      </div>

      {/* 타임라인 섹션을 조건부로 렌더링 */}
      {user.userId && playlists.length > 0 && (
        <>
          <div css={TimeLineStyle}>
            <div>타임라인</div>
            <button onClick={navigateToTimeline} css={SeeMore}>
              더보기
            </button>
          </div>

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
            {loading &&
              !playlists.length &&
              Array.from({ length: 8 }).map((_, index) => <SkeletonGridItem key={index} />)}
          </div>
        </>
      )}

      {/* 탐색 섹션은 항상 표시 */}
      <div css={TimeLineStyle}>
        <div>탐색</div>
      </div>

      <div css={gridContainerStyle}>
        {exploreData.slice(0, exploreVisibleItems).map((item, index) => (
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
        {loading &&
          exploreVisibleItems < exploreData.length &&
          Array.from({ length: 8 }).map((_, index) => <SkeletonGridItem key={index} />)}
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  background-color: ${colors.black};
  margin: 0 auto;
  margin-top: 40px;
`;

const carouselStyle = css`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const slideStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const thumbnailStyle = css`
  width: 80%;
  height: 350px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  cursor: pointer;
`;

const slickArrowStyle = css`
  .slick-prev,
  .slick-next {
    display: block !important;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    z-index: 2;
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }
`;

const TimeLineStyle = css`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 40px;
  padding: 0px 30px;
  font-weight: bold;
`;

const SeeMore = css`
  cursor: pointer;
  border: none;
  background: none;
  padding: 4px;
  color: ${colors.lightestGray};
  font-size: 16px;

  &:hover {
    background-color: ${colors.darkestGray};
    border-radius: 5px;
  }
`;

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(250px, auto);
  gap: 20px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;

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

export default Home;
