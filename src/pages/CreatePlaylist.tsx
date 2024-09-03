/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef, useEffect, useState } from 'react';
import AddPlaylist from '@/components/createPlaylist/AddPlaylist';
import PlaylistChart from '@/components/createPlaylist/PlaylistChart';
import Button from '@/components/Button';
import useYoutubeDataStore, { IYoutubelistData } from '@/stores/useYoutubeDataStore';
import useUserStore from '@/stores/useUserStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNewPlaylist from '@/hooks/useNewPlaylist';
import { PlaylistDataStore } from '@/types/playlistTypes';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import forkVideoId from '@/utils/forkVideoId';
import { useMultipleYoutubeFetch } from '@/hooks/useYoutubeFetch';

const CreatePlaylist = () => {
  const [videoIdList, setVideoIdList] = useState([]);
  const [userPlyData, setUserPlyData] = useState(null);
  const userData = useUserStore((state) => state.userInformation);
  const addedPlaylist = useYoutubeDataStore((state) => state.youTubelistData);
  const setYouTubelistData = useYoutubeDataStore((state) => state.setYouTubelistData);
  const playlistDataToAdd = useRef<{ getPlaylistData: () => PlaylistDataStore }>(null);
  const { id } = useParams() as { id: string };
  const { mutate } = useNewPlaylist();

  const { data: youtubeResults, isLoading } = useMultipleYoutubeFetch(videoIdList);

  useEffect(() => {
    if (!isLoading && youtubeResults) {
      setVideoIdList([]);
      youtubeResults.forEach((result) => {
        const youtubedata: IYoutubelistData = {
          id: result?.items[0].id,
          title: result?.items[0].snippet.title,
          link: [`https://www.youtube.com/watch?v=${result?.items[0].id}`],
          imgUrl: [`${result?.items[0].snippet.thumbnails.medium.url}`],
          channelTitle: result?.items[0].snippet.channelTitle,
        };
        setYouTubelistData(youtubedata);
      });
    }
  }, [youtubeResults, isLoading, setYouTubelistData]);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      if (id) {
        const res = await axios.get(`/api/watch/${id}`);
        const data = res.data;
        if (data) {
          console.log(data);
          const youtubeIdList = data.link?.map((url: string) => forkVideoId(url));
          setVideoIdList(youtubeIdList);
          setUserPlyData(data);
        }
      }
    };
    fetchPlaylistData();
  }, [id]);

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

  const fetchCreatePlaylistData = async (type: string) => {
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
        mutate({ playlistData, type, id });
        if (type === '추가') {
          toast.success('플레이리스트가 생성되었습니다.');
        } else if (type === '수정') {
          toast.success('플레이리스트가 수정되었습니다.');
        }
        setTimeout(() => {
          history.back();
        }, 2000);
      } catch (error) {
        toast.error('플레이리스트 업데이트 중 오류가 발생하였습니다. 다시 시도해주세요.');
        console.error(error);
      }
    }
  };
  return (
    <div css={{ margin: '5px 15px 0 0' }}>
      <h2 css={{ fontSize: '22px', marginBottom: '20px' }}>새 플레이리스트 추가</h2>
      <div css={{ display: 'flex' }}>
        <AddPlaylist ref={playlistDataToAdd} userPlyData={userPlyData} />
        <div css={{ width: 'calc(100% - 450px)', position: 'relative' }}>
          <PlaylistChart />
          <div css={btnArea}>
            <Button size="md">취소</Button>
            <Button
              size="md"
              background={true}
              onClick={() => {
                if (id) {
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

export default CreatePlaylist;

const btnArea = css`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  & * {
    margin-left: 20px;
  }
`;
