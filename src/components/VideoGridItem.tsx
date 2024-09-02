/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { colors } from '@/styles/colors';

import Cover from './Cover';
import MenuDot from './MenuDot';
import Tags from './Tags';
import User from './User';

interface VideoGridItemProps {
  videoId: string;
  title: string;
  user: string;
  showEdit: boolean;
  showDelete: boolean;
  tags: string[];
}

const VideoGridItem: React.FC<VideoGridItemProps> = ({
  videoId,
  title,
  showEdit = false,
  showDelete = true,
  tags,
}) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div css={gridItemStyle}>
      <Cover imageSrc={thumbnailUrl} playListLength={8} />
      <div css={descriptionStyle}>
        <div css={infoStyle}>
          <h3 css={titleStyle}>{title}</h3>
          <User profileImage="없음" nickname="손성오" userId="son" onlyImage={false} />
        </div>
        <div>
          <MenuDot showEdit={showEdit} showDelete={showDelete} />
        </div>
      </div>
      <Tags tags={tags} />
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
