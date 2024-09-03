import axios from 'axios';
import { NewPlaylistData } from '@/types/playlistTypes';

export const plyData = async (
  playlistData: NewPlaylistData,
  type: string,
  id: string | undefined,
): Promise<number | null> => {
  try {
    let res;
    if (type === '추가') {
      res = await axios.post('/api/createPlaylist', playlistData);
    } else if (type === '수정') {
      res = await axios.put(`/api/playlistEdit/${id}`, playlistData);
    }
    return res?.status || null;
  } catch (error) {
    console.error('업데이트 중 실패하였습니다.', error);
    return null;
  }
};
