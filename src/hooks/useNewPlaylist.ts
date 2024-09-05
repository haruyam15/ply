import { useMutation } from '@tanstack/react-query';
import { NewPlaylistData } from '@/types/playlistTypes';
import { plyData } from '@/apis/updatePlyData';

const useNewPlaylist = () => {
  return useMutation<
    number | null,
    Error,
    { playlistData: NewPlaylistData; type: string; playlistId: string | undefined }
  >({
    mutationFn: ({ playlistData, type, playlistId }) => plyData(playlistData, type, playlistId),
  });
};
export default useNewPlaylist;
