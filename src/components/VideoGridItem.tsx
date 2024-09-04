/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { colors } from '@/styles/colors';
import Cover from './Cover';
import MenuDot from './MenuDot';
import Tags from './Tags';
import User from './User';
import forkVideoId from '@/utils/forkVideoId';

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
  deleteItem?: (playlistId: string) => void; // 삭제 콜백 함수
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
  deleteItem,
}) => {
  const youtubeVideoId = forkVideoId(imgUrl);

  // 제목 18 글자 이상이면 ... 으로 뒤표시
  const truncatedTitle = title.length > 18 ? `${title.slice(0, 18)}...` : title;

  return (
    <div css={gridItemStyle}>
      <Cover
        imageSrc={imgUrl}
        playListLength={videoCount}
        playListId={videoId}
        youtubeVideoId={youtubeVideoId}
      />
      <div css={descriptionStyle}>
        <div css={infoStyle}>
          <h3 css={titleStyle}>{truncatedTitle}</h3> {/* 잘린 제목 사용 */}
          <User profileImage={profileImage} nickname={userName} userId={userId} onlyImage={false} />
        </div>
        {showMenuDot && (
          <div>
            <MenuDot
              showEdit={showEdit}
              showDelete={showDelete}
              deleteItem={deleteItem}
              playlistDataId={videoId} // playlistDataId 전달
            />
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
  border: 1px solid ${colors.inputGray};
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
