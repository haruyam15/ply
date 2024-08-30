/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from 'react';
import AddPlaylist, { PlaylistDataStore } from '@/components/createPlaylist/AddPlaylist';
import PlaylistChart from '@/components/createPlaylist/PlaylistChart';
import Button from '@/components/Button';
import usePlaylistDataStore from '@/stores/usePlaylistDataStore';
import useUserStore from '@/stores/useUserStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CreatePlaylist = () => {
  const userData = useUserStore((state) => state.userInformation.information);
  const addedPlaylist = usePlaylistDataStore((state) => state.playlistData);
  const playlistDataToAdd = useRef<{ getPlaylistData: () => PlaylistDataStore }>(null);

  const handleValidation = () => {
    if (playlistDataToAdd.current?.getPlaylistData()?.title === '') {
      toast.error('플레이리스트 제목을 입력해주세요.');
    } else if (playlistDataToAdd.current?.getPlaylistData()?.content === '') {
      toast.error('플레이리스트 설명을 입력해주세요.');
    } else if (addedPlaylist.length === 0) {
      toast.error('플레이리스트를 추가해주세요.');
    } else {
      fetchCreatePlaylistData();
    }
  };

  const fetchCreatePlaylistData = async () => {
    try {
      if (playlistDataToAdd.current?.getPlaylistData()) {
        const res = await axios.post('/api/createPlaylist', {
          userid: userData.userid,
          title: playlistDataToAdd.current?.getPlaylistData().title,
          content: playlistDataToAdd.current?.getPlaylistData().content,
          disclosureStatus: playlistDataToAdd.current?.getPlaylistData().disclosureStatus,
          tags: playlistDataToAdd.current?.getPlaylistData().tags,
          link: addedPlaylist.map((item) => item.link),
          imgUrl: addedPlaylist[0].imgUrl,
        });
        if (res.status === 201) toast.success('플레이리스트가 생성되었습니다.');
        history.back();
      }
    } catch (error) {
      toast.error('플레이리스트 생성 중에 오류가 발생하였습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };
  return (
    <div css={{ margin: '5px 15px 0 0' }}>
      <h2 css={{ fontSize: '22px', marginBottom: '20px' }}>새 플레이리스트 추가</h2>
      <div css={{ display: 'flex' }}>
        <AddPlaylist ref={playlistDataToAdd} />
        <div css={{ width: 'calc(100% - 450px)', position: 'relative' }}>
          <PlaylistChart />
          <div css={btnArea}>
            <Button size="md">취소</Button>
            <Button size="md" background={true} onClick={handleValidation}>
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
