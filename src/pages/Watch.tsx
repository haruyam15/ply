/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Comments from '@/components/watch/Comments';
import Player from '@/components/watch/Player';
import PlaylistInfo from '@/components/watch/PlaylistInfo';
import VideoList from '@/components/watch/VideoList';
import { useEffect, useState } from 'react';
import forkVideoId from '@/utils/forkVideoId';
import useWatchDataFetch from '@/hooks/useWatchDataFetch';
import useYoutubeFetch from '@/hooks/useYoutubeFetch';

function Watch() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(useLocation().search);
  const playlistId = useParams().playlistId as string;
  const playingVideoId = urlParams.get('v') as string;
  const [playingVideoTitle, setPlayingVideoTitle] = useState<string>('');
  const [youtubeVideoId, setYoutubeVideoId] = useState<string>('');

  const {
    data: playlistData,
    isLoading: playlistIsLoading,
    isError: playlistError,
  } = useWatchDataFetch({ playlistId, enabled: !!playlistId });

  const {
    data: youtubeData,
    isLoading: youtubeisLoading,
    isError: youtubeError,
  } = useYoutubeFetch({
    videoId: youtubeVideoId,
    enabled: !!youtubeVideoId,
    playlistId,
  });

  useEffect(() => {
    if (playlistData) {
      const { link } = playlistData;
      setYoutubeVideoId(link.map((l) => forkVideoId(l)).join(','));
    }
  }, [playlistData]);

  useEffect(() => {
    if (youtubeData) {
      const title = youtubeData.items.filter((item) => item.id === playingVideoId)[0].snippet.title;
      setPlayingVideoTitle(title);
    }
  }, [playingVideoId, youtubeData]);

  if (playlistError || youtubeError) {
    if (playlistError) {
      alert('플레이리스트 조회에 오류가 발생했습니다.');
    } else {
      alert('유튜브 조회에 오류가 발생했습니다.');
    }
    navigate('/');
  }

  if (playlistIsLoading || youtubeisLoading) {
    return null;
  }

  if (playlistData === undefined || youtubeData === undefined) {
    return null;
  }

  return (
    <div className="watch" css={watch}>
      <div className="watch-detail">
        <Player playingVideoId={playingVideoId} />
        <PlaylistInfo
          playlistId={playlistId}
          playlistData={playlistData}
          playingVideoTitle={playingVideoTitle}
        />
        <Comments />
      </div>
      <VideoList
        playlistId={playlistId}
        playingVideoId={playingVideoId}
        playlistData={playlistData}
        youtubeData={youtubeData}
      />
    </div>
  );
}

export default Watch;

const watch = css`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1400px;
  .watch-detail {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 7;
  }
`;
