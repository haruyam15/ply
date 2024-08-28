/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { colors } from '@/styles/colors';

import Cover from './Cover'; // Cover 컴포넌트 추가
import MenuDot from './MenuDot';
import Tags from './Tags';
import User from './User';

interface VideoGridItemProps {
  videoId: string;
  title: string;
  user: string;
}

const VideoGridItem: React.FC<VideoGridItemProps> = ({ videoId, title }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div css={gridItemStyle}>
      {/* Cover 컴포넌트로 이미지 감싸기 */}
      <Cover imageSrc={thumbnailUrl} playListLength={8} />
      <div css={descriptionStyle}>
        <div css={infoStyle}>
          <h3 css={titleStyle}>{title}</h3>
          <User profileimage="없음" nickname="손성오" userid="son" onlyImage={false} />
        </div>
        <div>
          <MenuDot />
        </div>
      </div>
      <Tags tags={['게임', '재미', '음악', '힐링']} />
    </div>
  );
};

const gridItemStyle = css`
  padding: 10px;
  background-color: ${colors.black};
  border-radius: 10px;
  height: 250px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const descriptionStyle = css`
  display: flex;
  justify-content: space-between;
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

export default VideoGridItem;
