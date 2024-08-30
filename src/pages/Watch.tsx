/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Comments from '@/components/watch/Comments';
import Player from '@/components/watch/Player';
import PlaylistInfo from '@/components/watch/PlaylistInfo';
import VideoList from '@/components/watch/VideoList';

function Watch() {
  return (
    <div className="watch" css={watch}>
      <div className="watch-detail">
        <Player />
        <PlaylistInfo />
        <Comments />
      </div>
      <VideoList />
    </div>
  );
}

export default Watch;

const watch = css`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  .watch-detail {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 7;
  }
`;
