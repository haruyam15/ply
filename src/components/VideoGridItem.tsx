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
  index?: number; // 추가: 각 항목의 index 전달
  deleteItem?: (index: number) => void; // 타입 수정: (index: number) => void로 수정
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
  index,
  deleteItem,
}) => {
  const youtubeVideoId = forkVideoId(imgUrl);

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
          <h3 css={titleStyle}>{title}</h3>
          <User profileImage={profileImage} nickname={userName} userId={userId} onlyImage={false} />
        </div>
        {showMenuDot && (
          <div>
            <MenuDot
              showEdit={showEdit}
              showDelete={showDelete}
              deleteItem={deleteItem} // 삭제 함수 전달
              index={index} // index 전달
              videoId={videoId}
            />
          </div>
        )}
      </div>
      {/* 태그를 감싸는 div에 스타일 적용 */}
      <div css={tagContainerStyle}>
        <Tags tags={tags} />
      </div>
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

const tagContainerStyle = css`
  display: flex;
  overflow: hidden; /* 넘치는 태그를 숨김 */
  white-space: nowrap; /* 태그가 한 줄로 유지되도록 설정 */
  flex-wrap: nowrap; /* 태그를 한 줄로 배치 */
  justify-content: flex-end;
`;

export default VideoGridItem;
