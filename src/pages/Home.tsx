/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import VideoGridItem from '@/components/VideoGridItem';

// Home 컴포넌트 정의
const Home: React.FC = () => {
  // 컴포넌트 내부에서 데이터 선언
  const videos = [
    'https://www.youtube.com/embed/pERDk4KoW-s',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/C0DPdy98e4c',
  ];

  const gridItems = [
    {
      src: 'https://www.youtube.com/embed/pERDk4KoW-s',
      title: '백예린-Antifreeze',
      user: 'Lovelace',
      thumbnail: 'https://via.placeholder.com/300x150.png?text=Thumbnail+1',
    },
    {
      src: 'https://example.com',
      title: 'Example Domain 1',
      user: 'User1',
      thumbnail: 'https://via.placeholder.com/300x150.png?text=Thumbnail+2',
    },
    {
      src: 'https://example.com',
      title: 'Example Domain 2',
      user: 'User2',
      thumbnail: 'https://via.placeholder.com/300x150.png?text=Thumbnail+3',
    },
    {
      src: 'https://example.com',
      title: 'Example Domain 3',
      user: 'User3',
      thumbnail: 'https://via.placeholder.com/300x150.png?text=Thumbnail+4',
    },
    {
      src: 'https://example.com',
      title: 'Example Domain 3',
      user: 'User3',
      thumbnail: 'https://via.placeholder.com/300x150.png?text=Thumbnail+4',
    },
    {
      src: 'https://example.com',
      title: 'Example Domain 3',
      user: 'User3',
      thumbnail: 'https://via.placeholder.com/300x150.png?text=Thumbnail+4',
    },
    {
      src: 'https://example.com',
      title: 'Example Domain 3',
      user: 'User3',
      thumbnail: 'https://via.placeholder.com/300x150.png?text=Thumbnail+4',
    },
    {
      src: 'https://example.com',
      title: 'Example Domain 3',
      user: 'User3',
      thumbnail: 'https://via.placeholder.com/300x150.png?text=Thumbnail+4',
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

  return (
    <div css={containerStyle}>
      {/* 캐러셀 섹션 */}
      <div css={[carouselStyle, slickArrowStyle]}>
        <Slider {...settings}>
          {videos.map((videoSrc, index) => (
            <div key={index} css={slideStyle}>
              <iframe
                src={videoSrc}
                title={`video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                css={iframeStyle}
              ></iframe>
            </div>
          ))}
        </Slider>
      </div>
      <div css={TimeLineStyle}>
        <div>타임라인</div>
        <div>더보기</div>
      </div>
      {/* 그리드 섹션 */}
      <div css={gridContainerStyle}>
        {gridItems.map((item, index) => (
          <VideoGridItem key={index} {...item} />
        ))}
      </div>
      <div css={TimeLineStyle}>
        <div>탐색</div>
        <div>더보기</div>
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
  width: 100%; /* 전체 너비 사용 */
  max-width: 1200px; /* 원하는 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
  margin-top: 40px;
`;

const carouselStyle = css`
  width: 100%; /* 캐러셀 컨테이너의 전체 너비 사용 */
  margin: 0 auto;
  overflow: hidden; /* 넘치는 콘텐츠 숨기기 */
  position: relative; /* 화살표 버튼의 위치 조정을 위해 상대 위치 설정 */
`;

const slideStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* 슬라이드의 전체 너비 사용 */
`;

const iframeStyle = css`
  width: 80%; /* iframe의 너비를 80%로 설정 */
  height: 300px; /* iframe의 높이를 캐러셀 컨테이너에 맞춤 */
  display: block; /* 블록 요소로 설정하여 margin이 작동하도록 함 */
  margin: 0 auto; /* 가운데 정렬 */
  border: none;
`;

// slick 화살표 스타일 추가
const slickArrowStyle = css`
  .slick-prev,
  .slick-next {
    display: block !important; /* 화살표 버튼을 항상 표시 */

    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    z-index: 2;
  }

  .slick-prev {
    left: 10px; /* 왼쪽 버튼 위치 조정 */
  }

  .slick-next {
    right: 10px; /* 오른쪽 버튼 위치 조정 */
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

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* 최소 너비 200px 이상인 경우 열 생성 */
  gap: 20px;
  padding: 20px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr); /* 화면 너비가 600px 이상일 때 두 열 */
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr); /* 화면 너비가 900px 이상일 때 세 열 */
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr); /* 화면 너비가 1200px 이상일 때 네 열 */
  }
`;

export default Home;
