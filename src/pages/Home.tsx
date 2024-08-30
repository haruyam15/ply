/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SkeletonGridItem from '@/components/SkeletionGridItem';
import VideoGridItem from '@/components/VideoGridItem';
import gridItemsData from '@/data/gridItemData';
import { colors } from '@/styles/colors';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setLoading(true);
        setTimeout(() => {
          setVisibleItems((prev) => prev + 8);
          setLoading(false); // 로딩 종료
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        {gridItemsData.slice(0, 8).map((item, index) => (
          <VideoGridItem key={index} {...item} showEdit={true} showDelete={true} />
        ))}
      </div>
      <div css={TimeLineStyle}>
        <div>탐색</div>
      </div>

      <div css={gridContainerStyle}>
        {gridItemsData.slice(0, visibleItems).map((item, index) => (
          <VideoGridItem key={index} {...item} showEdit={true} showDelete={true} />
        ))}
        {loading && Array.from({ length: 8 }).map((_, index) => <SkeletonGridItem key={index} />)}
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
