/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getWatchData } from '@/apis/getWatchData';
import Comments from '@/components/watch/Comments';
import Player from '@/components/watch/Player';
import PlaylistInfo from '@/components/watch/PlaylistInfo';
import VideoList from '@/components/watch/VideoList';

function Watch() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ['watch', playlistId],
    queryFn: () => getWatchData(playlistId as string),
    enabled: !!playlistId,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    alert(`error : ${error}`);
    navigate(`/`);
  }

  if (!data) {
    alert(`플레이리스트 정보가 없습니다.`);
    navigate(`/`);
    return;
  }

  const { comments, ...info } = data;

  return (
    <div className="watch" css={watch}>
      <div className="watch-detail">
        <Player src={info.link[0]} />
        <PlaylistInfo info={info} />
        <Comments comments={comments} />
      </div>
      <VideoList link={info.link} />
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
