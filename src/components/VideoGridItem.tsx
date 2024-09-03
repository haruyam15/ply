/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useMemo } from 'react';
import { colors } from '@/styles/colors';

import Cover from './Cover';
import MenuDot from './MenuDot';
import Tags from './Tags';
import User from './User';
import forkVideoId from '@/utils/forkVideoId'; // 추가된 부분

interface VideoGridItemProps {
  videoId: string;
  title: string;
  user: string;
  showEdit: boolean;
  showDelete: boolean;
  showMenuDot?: boolean;
  tags: string[];
  profileImage: string;
  userName: string;
  userId: string;
  imgUrl: string;
  videoCount: number;
}

const VideoGridItem: React.FC<VideoGridItemProps> = ({
  videoId,
  title,
  showEdit = false,
  showDelete = true,
  showMenuDot = false,
  tags,
  profileImage,
  userName,
  userId,
  imgUrl,
  videoCount,
}) => {
  // 유튜브 영상 ID를 추출
  const youtubeVideoId = useMemo(() => forkVideoId(imgUrl), [imgUrl]);

  return (
    <div css={gridItemStyle}>
      {/* Cover 컴포넌트에 videoId와 youtubeVideoId를 전달 */}
      <Cover
        imageSrc={imgUrl}
        playListLength={videoCount}
        playListId={videoId}
        youtubeVideoId={youtubeVideoId}
      />
      <div css={descriptionStyle}>
        <div css={infoStyle}>
          <h3 css={titleStyle}>{title}</h3>
          {/* User 컴포넌트에 사용자 정보 전달 */}
          <User profileImage={profileImage} nickname={userName} userId={userId} onlyImage={false} />
        </div>
        {showMenuDot && (
          <div>
            <MenuDot showEdit={showEdit} showDelete={showDelete} />
          </div>
        )}
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export default VideoGridItem;
