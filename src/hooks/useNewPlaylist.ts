import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { NewPlaylistData } from '@/types/playlistTypes';

const useNewPlaylist = () => {
  return useMutation<number, Error, NewPlaylistData>({
    mutationFn: async (playlistData) => {
      const res = await axios.post('/api/createPlaylist', playlistData);
      return res.status;
    },
  });
};
export default useNewPlaylist;
