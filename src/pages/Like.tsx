/** @jsxImportSource @emotion/react */
import SkeletonGridItem from '@/components/SkeletionGridItem';
import TitleHeader from '@/components/TitleHeader';
import VideoGridItem from '@/components/VideoGridItem';
import gridItemsData from '@/data/gridItemData';
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

const Like: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(16);
  const [loading, setLoading] = useState(false);

  // 무한 스크롤 처리
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setLoading(true);
        setTimeout(() => {
          setVisibleItems((prev) => prev + 8);
          setLoading(false);
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div css={containerStyle}>
      {/* Like 페이지의 헤더 */}
      <TitleHeader profileImage="없음" nickname="손성오" actionText="Like" />

      {/* Like 그리드 섹션 - 무한 스크롤 */}
      <div css={gridContainerStyle}>
        {gridItemsData.slice(0, visibleItems).map((item, index) => (
          <VideoGridItem key={index} {...item} />
        ))}
        {loading && Array.from({ length: 8 }).map((_, index) => <SkeletonGridItem key={index} />)}
      </div>
    </div>
  );
};

// 스타일 정의
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

export default Like;
