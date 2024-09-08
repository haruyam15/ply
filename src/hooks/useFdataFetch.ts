import { getFdata } from '@/apis/getFdata';
import { useQuery } from '@tanstack/react-query';

interface IUseFdataFetch {
  userId: string;
  optionalKey: 'following' | 'followers';
  enabled?: boolean;
}

function useFdataFetch({ userId, optionalKey, enabled }: IUseFdataFetch) {
  const queryKey = ['fdata', ...(optionalKey ? [optionalKey] : []), userId];
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getFdata(userId, optionalKey),
    enabled: enabled,
  });
}

export default useFdataFetch;
