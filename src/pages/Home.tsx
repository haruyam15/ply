/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import VideoGridItem from '@/components/VideoGridItem';
import { colors } from '@/styles/colors';

// Home 컴포넌트 정의
const Home: React.FC = () => {
  const navigate = useNavigate();

  // YouTube 비디오 ID 목록
  const videoIds = ['pERDk4KoW-s', 'dQw4w9WgXcQ', 'C0DPdy98e4c'];

  // 그리드 항목 데이터
  const gridItems = [
    {
      videoId: 'pERDk4KoW-s',
      title: '백예린-Antifreeze',
      user: 'Lovelace',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Example Domain 1',
      user: 'User1',
    },
    {
      videoId: 'C0DPdy98e4c',
      title: 'Example Domain 2',
      user: 'User2',
    },
    {
      videoId: 'pERDk4KoW-s',
      title: '백예린-Antifreeze',
      user: 'Lovelace',
    },
    {
      videoId: 'pERDk4KoW-s',
      title: '백예린-Antifreeze',
      user: 'Lovelace',
    },
    {
      videoId: 'pERDk4KoW-s',
      title: '백예린-Antifreeze',
      user: 'Lovelace',
    },
  ];

  // Slider 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // 화살표 버튼 활성화
  };

  const navigateToTimeline = () => {
    navigate('/timeline'); // '/timeline' 경로로 이동
  };

  const navigateToSearch = () => {
    navigate('/search');
  };

  return (
    <div css={containerStyle}>
      {/* 캐러셀 섹션 */}
      <div css={[carouselStyle, slickArrowStyle]}>
        <Slider {...settings}>
          {videoIds.map((videoId, index) => (
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
      {/* 그리드 섹션 */}
      <div css={gridContainerStyle}>
        {gridItems.map((item, index) => (
          <VideoGridItem key={index} {...item} />
        ))}
      </div>
      <div css={TimeLineStyle}>
        <div>탐색</div>
        <button onClick={navigateToSearch} css={SeeMore}>
          더보기
        </button>
      </div>
      <div css={gridContainerStyle}>
        {gridItems.map((item, index) => (
          <VideoGridItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

// 스타일 정의
const containerStyle = css`
  width: 100%;
  max-width: 1200px;
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
    background-color: ${colors.darkestGray}; /* hover 시 회색 배경으로 변경 */
    border-radius: 5px;
  }
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

export default Home;
