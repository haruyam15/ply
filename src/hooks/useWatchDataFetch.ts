import { getWatchData } from '@/apis/getWatchData';
import { useQuery } from '@tanstack/react-query';

function useWatchDataFetch(playlistId: string) {
  return useQuery({
    queryKey: ['watch', playlistId],
    queryFn: () => getWatchData(playlistId),
  });
}

export default useWatchDataFetch;
