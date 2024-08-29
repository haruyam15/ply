/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { getUserData } from '@/apis/getUserData';
import Button from '@/components/Button';
import Tags from '@/components/Tags';
import { IPlaylist } from '@/types/playlistTypes';
import User from '@/components/User';
import { colors } from '@/styles/colors';
import getYoutubeData from '@/apis/getYoutubeData';
import forkVideoId from '@/utils/forkVideoId';

interface IPlaylistInfoProps {
  info: Omit<IPlaylist, 'comments'>;
}
function PlaylistInfo({ info: data }: IPlaylistInfoProps) {
  const navigate = useNavigate();
  const { id, userId, title, tags, content, date, like, link } = data;
  const videoId = link.map((l) => forkVideoId(l)).join(',');

  const {
    error: userError,
    data: userData,
    isLoading: userIsLoading,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserData(userId),
  });

  const {
    error: youtubeError,
    data: youtubeData,
    isLoading: youtubeIsLoading,
  } = useQuery({
    queryKey: ['youtube', id],
    queryFn: () => getYoutubeData(videoId),
  });

  if (userIsLoading) {
    return <></>;
  }

  if (userError) {
    alert(`유저를 조회할 수 없습니다. \n ${userError}`);
    navigate(`/`);
    return;
  }

  if (!userData) {
    alert(`유저를 조회할 수 없습니다. \n ${userError}`);
    navigate(`/`);
    return;
  }

  if (youtubeIsLoading) {
    return <></>;
  }

  if (youtubeError) {
    alert(`유튜브 데이터를 조회할 수 없습니다. \n ${youtubeError}`);
    navigate(`/`);
    return;
  }

  if (!youtubeData) {
    alert(`유튜브 데이터를 조회할 수 없습니다. \n ${youtubeData}`);
    navigate(`/`);
    return;
  }

  return (
    <div className="playlist-info" css={playlistInfo}>
      <div className="info-header">
        <div className="title">
          <p className="playlist-title">{title}</p>
          <p className="video-title">{youtubeData.items[0].snippet.title}</p>
        </div>
        <div className="actions">
          <Button size="md">
            <Heart size="18" /> <span>{like.length}</span>
          </Button>
          <Tags tags={tags} />
        </div>
      </div>

      <div className="owner">
        <User
          profileimage={userData.profileimage}
          nickname={userData.nickname}
          userid={userId}
          size="lg"
        />
      </div>
      <div className="content">
        <p>{date}</p>
        {content}
      </div>
    </div>
  );
}

export default PlaylistInfo;

const playlistInfo = css`
  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 10px;
    margin-bottom: 20px;
    .title {
      flex-grow: 1;
      min-width: 0;
      .playlist-title {
        max-width: 100%;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .video-title {
        font-size: 16px;
      }
    }

    .actions {
      flex-shrink: 0;
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }

  .owner {
    margin-bottom: 20px;
  }

  .content {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 1.3;
    p {
      margin-bottom: 5px;
      font-size: 13px;
      color: ${colors.lightestGray};
    }
  }
`;
