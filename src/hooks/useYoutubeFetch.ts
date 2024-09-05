import getYoutubeData from '@/apis/getYoutubeData';
import { useQuery } from '@tanstack/react-query';

interface IUseYoutubeFetch {
  videoId: string;
  enabled?: boolean;
  playlistId?: string;
}
function useYoutubeFetch({ videoId, enabled, playlistId }: IUseYoutubeFetch) {
  if (!playlistId) {
    playlistId = videoId;
  }
  return useQuery({
    queryKey: ['youtube', playlistId],
    queryFn: () => getYoutubeData(videoId),
    enabled: enabled,
  });
}

export default useYoutubeFetch;
