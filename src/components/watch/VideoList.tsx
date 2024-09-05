/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Play } from 'lucide-react';
import { colors } from '@/styles/colors';
import forkVideoId from '@/utils/forkVideoId';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useYoutubeFetch from '@/hooks/useYoutubeFetch';
import useWatchDataFetch from '@/hooks/useWatchDataFetch';
import { useEffect, useState } from 'react';
import { If } from '@/components/IfElse';

function VideoList() {
  const navigate = useNavigate();
  const playlistId = useParams().playlistId as string;
  const urlParams = new URLSearchParams(useLocation().search);
  const playingVideoId = urlParams.get('v') as string;
  const { isLoading: playlistLoading, data: playlistData } = useWatchDataFetch(playlistId);
  const [videoId, setVideoId] = useState<string>('');

  useEffect(() => {
    if (playlistData) {
      const { link } = playlistData;
      setVideoId(link.map((l) => forkVideoId(l)).join(','));
    }
  }, [playlistData]);

  const { data: youtubeData, isLoading: youtubeIsLoading } = useYoutubeFetch(
    videoId,
    !!videoId,
    playlistId,
  );

  if (playlistLoading || youtubeIsLoading) {
    return <div></div>;
  }

  if (!youtubeData) {
    return <div></div>;
  }

  if (!playlistData) {
    alert('플레이리스트 조회에 오류가 발생했습니다.');
    navigate('/');
    return null;
  }

  const { title, userName } = playlistData;
  const totalVideoCnt = youtubeData.items.length;
  const nowPlayingindex = playlistData.link.map((li) => forkVideoId(li)).indexOf(playingVideoId);

  return (
    <div className="video-list" css={list}>
      <div className="list-header">
        <p>{title}</p>
        <span>
          {userName}
          <em>
            - {nowPlayingindex + 1} / {totalVideoCnt}
          </em>
        </span>
      </div>
      <ul className="list-body">
        {youtubeData.items.map((item, i) => {
          const { title, channelTitle, thumbnails } = item.snippet;
          const youtubeVideoId = item.id;
          return (
            <li key={i}>
              <Link to={`/watch/${playlistId}?v=${youtubeVideoId}`}>
                <div className="num">
                  <If test={i === nowPlayingindex}>
                    <If.Then>
                      <Play size={12} fill={colors.white} />
                    </If.Then>
                    <If.Else>{i + 1}</If.Else>
                  </If>
                </div>
                <div className="thumb">
                  <img src={thumbnails.default.url} alt="" />
                </div>
                <div className="video-info">
                  <p>{title}</p>
                  <span>{channelTitle}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VideoList;

const list = css`
  flex: 3;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${colors.darkestGray};
  overflow: hidden;

  .list-header {
    background: #212121;
    padding: 20px 15px;
    box-sizing: border-box;
    p {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }
    span {
      font-size: 13px;
      em {
        font-style: normal;
        color: ${colors.lightestGray};
      }
    }
  }

  .list-body {
    li {
      a {
        display: flex;
        padding: 10px 5px;
        align-items: center;
        gap: 10px;
        color: ${colors.lightestGray};
      }
      .num {
        width: 12px;
        flex-shrink: 0;
        text-align: center;
      }
      .thumb {
        width: 100px;
        flex-shrink: 0;
        img {
          height: auto;
          border-radius: 8px;
        }
      }
      .video-info {
        font-size: 15px;
        p {
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
        }
        span {
          font-size: 12px;
          color: ${colors.lightestGray};
        }
      }
    }

    li:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;
