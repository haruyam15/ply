import getYoutubeData from '@/apis/getYoutubeData';
import { useQuery } from '@tanstack/react-query';

function useYoutubeFetch(videoId: string, enabled: boolean, playlistId?: string) {
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
