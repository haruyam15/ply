import { useMutation } from '@tanstack/react-query';
import { NewPlaylistData } from '@/types/playlistTypes';
import { updatePlyData } from '@/apis/updatePlyData';

const useNewPlaylist = () => {
  return useMutation<
    number | null,
    Error,
    { playlistData: NewPlaylistData; type: string; playlistId: string | undefined }
  >({
    mutationFn: ({ playlistData, type, playlistId }) =>
      updatePlyData(playlistData, type, playlistId),
  });
};
export default useNewPlaylist;
