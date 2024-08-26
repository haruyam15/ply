/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { colors } from '@/styles/colors';

interface VideoGridItemProps {
  src: string;
  title: string;
  user: string; // 사용자 이름 추가
  thumbnail: string; // 썸네일 이미지 추가
}

const VideoGridItem: React.FC<VideoGridItemProps> = ({ title, user, thumbnail }) => {
  return (
    <div css={gridItemStyle}>
      <img src={thumbnail} alt={title} css={thumbnailStyle} /> {/* 썸네일 이미지 */}
      <div css={infoStyle}>
        <h3 css={titleStyle}>{title}</h3>
        <p css={userStyle}>{user}</p>
      </div>
      <div css={tagGroupStyle}>
        <div css={tagStyle}>게임</div>
        <div css={tagStyle}>게임</div>
        <div css={tagStyle}>게임</div>
        <div css={tagStyle}>게임</div>
      </div>
    </div>
  );
};

// 스타일 정의
const gridItemStyle = css`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const thumbnailStyle = css`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
`;

const infoStyle = css`
  padding: 10px;
  text-align: left;
`;

const titleStyle = css`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: ${colors.primaryGreen};
`;

const userStyle = css`
  margin: 0;
  color: #555;
  font-size: 14px;
`;

const tagGroupStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const tagStyle = css`
  flex: 1;
  margin: 0 5px;
  padding: 8px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default VideoGridItem;
