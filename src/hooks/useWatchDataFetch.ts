import { getWatchData } from '@/apis/getWatchData';
import { useQuery } from '@tanstack/react-query';

interface IUseWatchDataFetch {
  playlistId: string;
  optionalKey?: string;
  enabled?: boolean;
}

function useWatchDataFetch({ playlistId, optionalKey, enabled }: IUseWatchDataFetch) {
  const queryKey = ['watch', ...(optionalKey ? [optionalKey] : []), playlistId];
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getWatchData(playlistId),
    enabled: enabled,
  });
}

export default useWatchDataFetch;
