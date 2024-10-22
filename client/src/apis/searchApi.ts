import axios from 'axios';
import { IPlaylist } from '@/types/playlistTypes';

export const searchPlaylists = async (
  searchTerm: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _filter: string,
): Promise<IPlaylist[]> => {
  try {
    const response = await axios.get('https://plyserver.kro.kr/api/searchs', {
      params: { term: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
    throw error;
  }
};
