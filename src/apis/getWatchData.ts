import axios from 'axios';

import { IPlaylist } from '@/types/playlistTypes';

export const getWatchData = async (playlistId: string): Promise<IPlaylist> => {
  const url = new URL('getPlaylist', `http://localhost:8080/api/`);
  const params = new URLSearchParams({
    playlistId,
  });
  url.search = params.toString();
  return axios.get(url.toString()).then((res) => res.data);
};
