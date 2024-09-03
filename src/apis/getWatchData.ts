import axios from 'axios';

import { IPlaylist } from '@/types/playlistTypes';

export const getWatchData = async (playlistId: string): Promise<IPlaylist | null> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/watch/${playlistId}`);
    return response.data;
  } catch (error) {
    console.error('플레이리스트 데이터 호출을 실패했습니다.:', error);
    return null;
  }
};
