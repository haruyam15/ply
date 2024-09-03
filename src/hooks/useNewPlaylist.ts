import { useMutation } from '@tanstack/react-query';
import { NewPlaylistData } from '@/types/playlistTypes';
import { plyData } from '@/apis/cuPlyData';

const useNewPlaylist = () => {
  return useMutation<
    number | null,
    Error,
    { playlistData: NewPlaylistData; type: string; id: string | undefined }
  >({
    mutationFn: ({ playlistData, type, id }) => plyData(playlistData, type, id),
  });
};
export default useNewPlaylist;
