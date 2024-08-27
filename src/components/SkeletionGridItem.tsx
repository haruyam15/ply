/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// 스켈레톤 UI 컴포넌트 정의
const SkeletonGridItem: React.FC = () => {
  return (
    <div css={skeletonStyle}>
      <div css={skeletonThumbnailStyle}></div>
      <div css={skeletonInfoStyle}>
        <div css={skeletonTitleStyle}></div>
        <div css={skeletonUserStyle}></div>
      </div>
    </div>
  );
};

// 스타일 정의
const skeletonStyle = css`
  padding: 10px;
  background-color: #333;
  border-radius: 10px;
  height: 250px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const skeletonThumbnailStyle = css`
  width: 100%;
  height: 140px;
  background-color: #444;
  border-radius: 12px;
`;

const skeletonInfoStyle = css`
  padding: 10px;
`;

const skeletonTitleStyle = css`
  width: 60%;
  height: 20px;
  background-color: #444;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const skeletonUserStyle = css`
  width: 40%;
  height: 20px;
  background-color: #444;
  border-radius: 4px;
`;

export default SkeletonGridItem;
