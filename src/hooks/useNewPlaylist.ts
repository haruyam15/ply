import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewPlaylistData } from '@/types/playlistTypes';
import { updatePlyData } from '@/apis/updatePlyData';

const useNewPlaylist = (playlistId: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    number | null,
    Error,
    { playlistData: NewPlaylistData; type: string; playlistId: string | undefined }
  >({
    mutationFn: ({ playlistData, type, playlistId }) =>
      updatePlyData(playlistData, type, playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watch', playlistId] });
    },
  });
};
export default useNewPlaylist;
