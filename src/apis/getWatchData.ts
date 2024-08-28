import axios from 'axios';

import { Playlist } from '@/types/Playlist';

export const getWatchData = async (playlistId: string): Promise<Playlist> => {
  const url = new URL('playlist', `http://localhost:8080/api/`);
  const params = new URLSearchParams({
    title: playlistId,
  });
  url.search = params.toString();
  return axios.get(url.toString()).then((res) => res.data);
};
