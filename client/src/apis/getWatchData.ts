import axios from 'axios';

import { IPlaylist } from '@/types/playlistTypes';

export const getWatchData = async (playlistId: string): Promise<IPlaylist> => {
  try {
    const response = await axios.get(`http://15.164.228.103/api/watch/${playlistId}`);
    return response.data;
  } catch (error) {
    console.error('플레이리스트 데이터 호출을 실패했습니다.:', error);
    throw error;
  }
};