/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { colors } from '@/styles/colors';

import User from './User';

interface VideoGridItemProps {
  videoId: string; // 비디오 ID 추가
  title: string;
  user: string;
}

const VideoGridItem: React.FC<VideoGridItemProps> = ({ videoId, title }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div css={gridItemStyle}>
      <img src={thumbnailUrl} alt={title} css={thumbnailStyle} />
      <div css={infoStyle}>
        <h3 css={titleStyle}>{title}</h3>
        <User profileimage="없음" nickname="손성오" userid="son" onlyImage={false} />
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
  padding: 10px;
  background-color: ${colors.black};
  border-radius: 10px;
  height: 250px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const thumbnailStyle = css`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
`;

const infoStyle = css`
  padding: 10px;
  text-align: left;
`;

const titleStyle = css`
  margin-bottom: 10px;
  padding-left: 8px;
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white};
`;

const tagGroupStyle = css`
  display: flex;
  justify-content: space-around;
  padding: 2px;
`;

const tagStyle = css`
  flex: 1;
  margin: 0 5px;
  padding: 4px;
  background-color: transparent;
  border: 1px solid ${colors.tagBoxGray};
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  color: ${colors.tagBoxGray};

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default VideoGridItem;
