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

interface PlaylistData {
  title: string;
  userId: string;
  tags: string[];
  imgUrl: string[];
  disclosureStatus: boolean;
}

interface UserInformation {
  profileImage: string;
  userName: string;
  userId: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(8); // 타임라인의 초기 항목 수
  const [exploreVisibleItems, setExploreVisibleItems] = useState(4); // 탐색의 초기 항목 수
  const [loading, setLoading] = useState(true); // 초기 로딩 상태
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [exploreData, setExploreData] = useState<PlaylistData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
  const [hasMoreExplore, setHasMoreExplore] = useState(true); // 탐색 데이터의 무한 스크롤 상태 관리

  useEffect(() => {
    const userInformationString = localStorage.getItem('userInformation');
    let userId: string | null = null;

    if (userInformationString) {
      try {
        const userInformation = JSON.parse(userInformationString);
        userId = userInformation.userId as string;
        fetchUserInformation(userId);
        fetchTimelineData(userId);
        fetchExploreData(); // 탐색 데이터 가져오기
      } catch (e) {
        console.error('로컬 스토리지에서 사용자 정보를 파싱하는 중 오류 발생:', e);
      }
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      // 스크롤 위치가 끝에 도달했을 때 && 로딩 중이 아닐 때 && 추가 데이터가 있을 때
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMoreExplore) {
        loadMoreItems(); // 추가 아이템 로드
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMoreExplore, exploreVisibleItems, exploreData.length]);

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setExploreVisibleItems((prev) => prev + 8); // 탐색 데이터의 항목 수 증가
      setLoading(false);

      if (exploreData.length <= exploreVisibleItems + 8) {
        setHasMoreExplore(false); // 더 이상 추가할 탐색 데이터가 없는 경우
      }
    }, 1000);
  };

  const fetchUserInformation = async (userId: string) => {
    try {
      const response = await fetch(`/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는 중 오류가 발생했습니다.');
      }
      const data = await response.json();
      setUserInformation(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('사용자 정보 요청 오류:', error.message);
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      } else {
        console.error('알 수 없는 오류:', error);
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const fetchTimelineData = async (userId: string) => {
    try {
      const response = await fetch(`/api/timeline/${userId}`);
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
      const response = await fetch('/api/search'); // search.js API 호출
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
      setLoading(false); // 모든 데이터 로딩이 끝난 후에 로딩 상태를 false로 설정
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const navigateToTimeline = () => {
    navigate('/timeline');
  };

  return (
    <div css={containerStyle}>
      <div css={[carouselStyle, slickArrowStyle]}>
        <Slider {...settings}>
          {['pERDk4KoW-s', 'dQw4w9WgXcQ', 'C0DPdy98e4c'].map((videoId, index) => (
            <div key={index} css={slideStyle}>
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={`video ${index + 1}`}
                css={thumbnailStyle}
              />
            </div>
          ))}
        </Slider>
      </div>

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
            videoId={item.imgUrl[0].split('/')[4]} // imgUrl에서 videoId 추출
            title={item.title}
            user={item.userId}
            showDelete={true}
            showEdit={true}
            tags={item.tags}
            profileImage={userInformation?.profileImage || ''}
            userName={item.userId}
            userId={item.userId}
            imgUrl={item.imgUrl[0]}
          />
        ))}
        {loading &&
          !playlists.length &&
          Array.from({ length: 8 }).map((_, index) => <SkeletonGridItem key={index} />)}
      </div>

      <div css={TimeLineStyle}>
        <div>탐색</div>
      </div>

      <div css={gridContainerStyle}>
        {exploreData.slice(0, exploreVisibleItems).map((item, index) => (
          <VideoGridItem
            key={index}
            videoId={item.imgUrl[0].split('/')[4]} // imgUrl에서 videoId 추출
            title={item.title}
            user={item.userId}
            showDelete={true}
            showEdit={true}
            tags={item.tags}
            profileImage={userInformation?.profileImage || ''}
            userName={item.userId}
            userId={item.userId}
            imgUrl={item.imgUrl[0]} // imgUrl 배열에서 첫 번째 요소 사용
          />
        ))}
        {loading &&
          exploreVisibleItems < exploreData.length &&
          Array.from({ length: 8 }).map((_, index) => <SkeletonGridItem key={index} />)}
      </div>
    </div>
  );
};

// 스타일 정의
const containerStyle = css`
  width: 100%;
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
  height: 300px;
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
  color: inherit;
  font: inherit;

  &:hover {
    background-color: ${colors.darkestGray};
    border-radius: 5px;
  }
`;

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 가로로 자동 조정 */
  grid-auto-rows: minmax(250px, auto); /* 세로로 자동 조정 */
  gap: 20px;
  padding: 20px;
  width: 100%; /* 그리드 컨테이너의 너비를 100%로 설정 */
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
