import { getWatchData } from '@/apis/getWatchData';
import { useQuery } from '@tanstack/react-query';

function useWatchData(playlistId: string) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['watch', playlistId],
    queryFn: () => getWatchData(playlistId),
  });

  return { isLoading, error, data };
}

export default useWatchData;
