/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef, useEffect, useState } from 'react';
import AddPlaylist from '@/components/managePlaylist/AddPlaylist';
import PlaylistChart from '@/components/managePlaylist/PlaylistChart';
import Button from '@/components/Button';
import useYoutubeDataStore, { IYoutubelistData } from '@/stores/useYoutubeDataStore';
import useUserStore from '@/stores/useUserStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNewPlaylist from '@/hooks/useNewPlaylist';
import { PlaylistDataStore } from '@/types/playlistTypes';
import { useNavigate, useParams } from 'react-router-dom';
import forkVideoId from '@/utils/forkVideoId';
import useYoutubeFetch from '@/hooks/useYoutubeFetch';
import useWatchDataFetch from '@/hooks/useWatchDataFetch';

const ManagePlaylist = () => {
  const [videoIdList, setVideoIdList] = useState('');
  const userData = useUserStore((state) => state.userInformation);
  const addedPlaylist = useYoutubeDataStore((state) => state.youTubelistData);
  const setYouTubelistData = useYoutubeDataStore((state) => state.setYouTubelistData);
  const clearYoutubelistData = useYoutubeDataStore((state) => state.clearYoutubelistData);
  const playlistDataToAdd = useRef<{ getPlaylistData: () => PlaylistDataStore }>(null);
  const { playlistId } = useParams() as { playlistId: string };
  const { data: youtubeResults } = useYoutubeFetch({
    videoId: videoIdList,
    enabled: !!videoIdList,
  });
  const { data: userPlyData } = useWatchDataFetch({
    playlistId,
    optionalKey: 'Edit',
    enabled: !!playlistId,
  });
  const { mutate } = useNewPlaylist();
  const navigate = useNavigate();

  useEffect(() => {
    youtubeResults?.items.forEach((data) => {
      const youtubedata: IYoutubelistData = {
        id: data?.id,
        title: data?.snippet.title,
        link: [`https://www.youtube.com/watch?v=${data?.id}`],
        imgUrl: [data?.snippet.thumbnails.maxres.url],
        channelTitle: data?.snippet.channelTitle,
      };
      setYouTubelistData(youtubedata);
      setVideoIdList('');
    });
  }, [youtubeResults, videoIdList]);

  useEffect(() => {
    if (addedPlaylist.length > 0) {
      clearYoutubelistData();
    }
    if (playlistId && userPlyData) {
      const arrLinkToString = userPlyData.link
        ?.map((url: string) => forkVideoId(url))
        .filter(Boolean)
        .join(',');
      setVideoIdList(arrLinkToString);
    }
  }, [playlistId, userPlyData]);

  const handleValidation = (type: string) => {
    if (playlistDataToAdd.current?.getPlaylistData()?.title === '') {
      toast.error('플레이리스트 제목을 입력해주세요.');
    } else if (playlistDataToAdd.current?.getPlaylistData()?.content === '') {
      toast.error('플레이리스트 설명을 입력해주세요.');
    } else if (addedPlaylist.length === 0) {
      toast.error('플레이리스트를 추가해주세요.');
    } else {
      fetchCreatePlaylistData(type);
    }
  };

  const fetchCreatePlaylistData = (type: string) => {
    if (playlistDataToAdd.current?.getPlaylistData()) {
      const playlistData = {
        userId: userData.userId,
        title: playlistDataToAdd.current?.getPlaylistData().title,
        content: playlistDataToAdd.current?.getPlaylistData().content,
        disclosureStatus: playlistDataToAdd.current?.getPlaylistData().disclosureStatus,
        tags: playlistDataToAdd.current?.getPlaylistData().tags,
        link: addedPlaylist.map((item) => item.link?.[0]),
        imgUrl: addedPlaylist.map((item) => item.imgUrl?.[0]),
      };
      try {
        mutate({ playlistData, type, playlistId });
        if (type === '추가') {
          toast.success('플레이리스트가 생성되었습니다.');
        } else if (type === '수정') {
          toast.success('플레이리스트가 수정되었습니다.');
        }
        setTimeout(() => {
          clearYoutubelistData();
          navigate(`/playlist/${userData.userId}`);
        }, 2000);
      } catch (error) {
        toast.error('플레이리스트 업데이트 중 오류가 발생하였습니다. 다시 시도해주세요.');
        console.error(error);
      }
    }
  };
  return (
    <div css={{ width: '100%', margin: '5px 15px 0 0' }}>
      <h2 css={{ fontSize: '22px', marginBottom: '20px' }}>
        {userPlyData ? '내' : '새'} 플레이리스트 {userPlyData ? '수정' : '추가'}
      </h2>
      <div css={{ display: 'flex' }}>
        <AddPlaylist ref={playlistDataToAdd} userPlyData={userPlyData} />
        <div css={{ width: 'calc(100% - 450px)', position: 'relative' }}>
          <PlaylistChart />
          <div css={btnArea}>
            <Button size="md" onClick={() => history.back()}>
              취소
            </Button>
            <Button
              size="md"
              background={true}
              onClick={() => {
                if (playlistId) {
                  handleValidation('수정');
                } else {
                  handleValidation('추가');
                }
              }}
            >
              완료
            </Button>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          limit={2}
          closeButton={false}
          autoClose={3000}
          hideProgressBar
        />
      </div>
    </div>
  );
};

export default ManagePlaylist;

const btnArea = css`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  & * {
    margin-left: 20px;
  }
`;
