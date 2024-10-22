/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface IPlayerProps {
  playingVideoId: string;
}

function Player({ playingVideoId }: IPlayerProps) {
  return (
    <div className="player" css={player} key={playingVideoId}>
      <iframe src={`https://www.youtube.com/embed/${playingVideoId}`} allowFullScreen></iframe>
    </div>
  );
}

export default Player;

const player = css`
  position: relative;
  padding-bottom: 56.25%;
  border-radius: 8px;
  overflow: hidden;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;
