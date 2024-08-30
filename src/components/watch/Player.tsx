/** @jsxImportSource @emotion/react */
import useWatchData from '@/hooks/useWatchData';
import useNowPlayingStore from '@/stores/useNowPlayingStore';
import forkVideoId from '@/utils/forkVideoId';
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Player() {
  const playlistId = useParams().playlistId as string;
  const playingVideoId = useNowPlayingStore((state) => state.playingVideoId);
  const setPlayingVideoId = useNowPlayingStore((state) => state.setPlayingVideoId);
  const { data } = useWatchData(playlistId);

  useEffect(() => {
    if (data) {
      const now = forkVideoId(data.link[0]) as string;
      setPlayingVideoId(now);
    }
  }, [data, setPlayingVideoId]);

  return (
    <div className="player" css={player}>
      <iframe
        src={`https://www.youtube.com/embed/${playingVideoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
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
