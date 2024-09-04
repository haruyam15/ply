import { getWatchData } from '@/apis/getWatchData';
import { useQuery } from '@tanstack/react-query';

function useWatchDataFetch(playlistId: string, optionalKey?: string, enabled?: boolean) {
  const queryKey = ['watch', ...(optionalKey ? [optionalKey] : []), playlistId];
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getWatchData(playlistId),
    enabled: enabled,
  });
}

export default useWatchDataFetch;
