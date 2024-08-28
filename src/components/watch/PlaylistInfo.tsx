/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { getUserData } from '@/apis/getUserData';
import Button from '@/components/Button';
import Tags from '@/components/Tags';
import { Playlist } from '@/types/Playlist';

interface IPlaylistInfoProps {
  info: Omit<Playlist, 'comments'>;
}
function PlaylistInfo({ info }: IPlaylistInfoProps) {
  const userId = info.userId;
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserData(userId as string),
  });

  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  // if (error) {
  //   alert(`error : ${error}`);
  //   navigate(`/`);
  // }

  // if (data) {
  //   return <div>no-data</div>;
  // }

  console.log(data);

  return (
    <div className="playlist-info" css={playlistInfo}>
      <div className="info-header">
        <div className="title">
          <p className="playlist-title">{'title'}</p>
          <p className="video-title">영상 title</p>
        </div>
        <div className="actions">
          <Button size="md">
            <Heart size="18" /> <span>{'numoflike'}</span>
          </Button>
          <Tags tags={['tags']} />
        </div>
      </div>

      <div className="owner">
        {/* <User profileimage={profileimage} nickname={nickname} userid={userid} size="lg" /> */}
      </div>

      <div className="content">{'content'}</div>
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
  }
`;
