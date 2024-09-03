import { getWatchData } from '@/apis/getWatchData';
import { useQuery } from '@tanstack/react-query';

function useWatchDataFetch(playlistId: string, optionalKey?: string) {
  const queryKey = ['watch', ...(optionalKey ? [optionalKey] : []), playlistId];
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getWatchData(playlistId),
  });
}

export default useWatchDataFetch;
