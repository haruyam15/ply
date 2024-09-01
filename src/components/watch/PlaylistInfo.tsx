/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { getUserData } from '@/apis/getUserData';
import Button from '@/components/Button';
import Tags from '@/components/Tags';
import User from '@/components/User';
import { colors } from '@/styles/colors';
import forkVideoId from '@/utils/forkVideoId';
import useYoutubeFetch from '@/hooks/useYoutubeFetch';
import useWatchData from '@/hooks/useWatchData';
import { useEffect, useState } from 'react';

//플리데이터안에 유저데이터오면 코드수정해야 함

function PlaylistInfo() {
  const playlistId = useParams().playlistId as string;
  const navigate = useNavigate();

  const {
    isLoading: playlistLoading,
    data: playlistData,
    error: playlistError,
  } = useWatchData(playlistId);

  const [videoId, setVideoId] = useState<string>('');
  const [makerId, setMakerId] = useState<string>('');

  useEffect(() => {
    if (playlistData) {
      const { link, userId } = playlistData;
      setVideoId(link.map((l) => forkVideoId(l)).join(','));
      setMakerId(userId);
    }
  }, [playlistData]);

  const {
    data: youtubeData,
    error: youtubeError,
    isLoading: youtubeIsLoading,
  } = useYoutubeFetch(videoId, !!videoId, playlistId);

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useQuery({
    queryKey: ['user', makerId],
    queryFn: () => getUserData(makerId),
    enabled: !!makerId,
  });

  if (playlistLoading || youtubeIsLoading || userIsLoading) {
    return <div></div>;
  }

  if (playlistError) {
    alert('플레이리스트 조회에 오류가 발생했습니다.');
    navigate('/');
    return null;
  }

  if (youtubeError) {
    alert('유튜브 조회에 오류가 발생했습니다.');
    navigate('/');
    return null;
  }
  if (userError) {
    alert('유저 조회에 오류가 발생했습니다.');
    navigate('/');
    return null;
  }

  if (!userData || !youtubeData || !playlistData) {
    return null;
  }

  const { title, tags, content, date, like } = playlistData;

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
          userid={makerId}
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
