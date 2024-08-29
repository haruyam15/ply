/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import AddPlaylist from '@/components/createPlaylist/AddPlaylist';
import PlaylistChart from '@/components/createPlaylist/PlaylistChart';

const CreatePlaylist = () => {
  return (
    <>
      <h2 css={{ fontSize: '22px', margin: '5px 0 20px' }}>새 플레이리스트 추가</h2>
      <div css={{ display: 'flex' }}>
        <AddPlaylist />
        <PlaylistChart />
      </div>
    </>
  );
};

export default CreatePlaylist;
