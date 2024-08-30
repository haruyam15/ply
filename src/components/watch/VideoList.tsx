/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Play } from 'lucide-react';
import { colors } from '@/styles/colors';
import forkVideoId from '@/utils/forkVideoId';
import { useNavigate, useParams } from 'react-router-dom';
import useYoutubeFecth from '@/hooks/useYoutubeFetch';
import useWatchData from '@/hooks/useWatchData';
import { useEffect, useState } from 'react';
import useNowPlayingStore from '@/stores/useNowPlayingStore';
import { If } from '@/components/IfElse';

function VideoList() {
  const playlistId = useParams().playlistId as string;
  const navigate = useNavigate();
  const playingVideoId = useNowPlayingStore((state) => state.playingVideoId);

  const {
    isLoading: playlistLoading,
    data: playlistData,
    error: playlistError,
  } = useWatchData(playlistId);

  const [videoId, setVideoId] = useState<string>('');

  useEffect(() => {
    if (playlistData) {
      const { link } = playlistData;
      setVideoId(link.map((l) => forkVideoId(l)).join(','));
    }
  }, [playlistData]);

  const {
    data: youtubeData,
    error: youtubeError,
    isLoading: youtubeIsLoading,
  } = useYoutubeFecth(playlistId, videoId, !!videoId);

  if (playlistLoading || youtubeIsLoading) {
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

  if (!youtubeData || !playlistData) {
    return null;
  }
  console.log(playlistData);
  const title = playlistData.title;
  const totalVideoCnt = playlistData.link.length;
  const nowPlayingindex = playlistData.link.map((li) => forkVideoId(li)).indexOf(playingVideoId);

  return (
    <div className="video-list" css={list}>
      <div className="list-header">
        <p>{title}</p>
        <span>
          하루얌(플리데이터에 유저데이터 담아져오면 수정해야 함){' '}
          <em>
            - {nowPlayingindex + 1} / {totalVideoCnt}
          </em>
        </span>
      </div>
      <ul className="list-body">
        {youtubeData.items.map((item, i) => {
          const { title, channelTitle, thumbnails } = item.snippet;
          return (
            <li key={i}>
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
    /* max-height: calc(100% - 80px); */
    overflow-y: auto;
    li {
      display: flex;
      padding: 10px 5px;
      align-items: center;
      gap: 10px;
      .num {
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
