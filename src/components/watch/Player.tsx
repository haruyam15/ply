/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import forkVideoId from '@/utils/forkVideoId';

// import getYoutubeData from '@/apis/getYoutubeData';
// import { ISnippet } from '@/types/youtubeResponseTypes';
// import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

interface IPlayerProps {
  src: string;
}
function Player({ src }: IPlayerProps) {
  const videoId = forkVideoId(src) as string;

  // const { isLoading, data } = useQuery({
  //   queryKey: ['youtube', videoId],
  //   queryFn: () => getYoutubeData(videoId),
  // });

  // if (isLoading) {
  //   return <div>loading...</div>;
  // }

  // console.log(data);

  return (
    <div className="player" css={player}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
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
