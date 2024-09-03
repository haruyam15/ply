import getYoutubeData from '@/apis/getYoutubeData';
import { useQuery } from '@tanstack/react-query';

function useYoutubeFetch(videoId: string, enabled: boolean, playlistId?: string) {
  if (!playlistId) {
    playlistId = videoId;
  }
  const { error, data, isLoading } = useQuery({
    queryKey: ['youtube', playlistId],
    queryFn: () => getYoutubeData(videoId),
    enabled: enabled,
  });
  return { error, data, isLoading };
}

export default useYoutubeFetch;

export function useMultipleYoutubeFetch(videoIds: string[]) {
  return useQuery({
    queryKey: ['youtube', videoIds],
    queryFn: () => Promise.all(videoIds.map((id: string) => getYoutubeData(id))),
    enabled: videoIds.length > 0,
  });
}
