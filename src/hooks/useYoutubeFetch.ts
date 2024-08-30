import getYoutubeData from '@/apis/getYoutubeData';
import { useQuery } from '@tanstack/react-query';

function useYoutubeFecth(playlistId: string, videoId: string, enabled: boolean) {
  const { error, data, isLoading } = useQuery({
    queryKey: ['youtube', playlistId],
    queryFn: () => getYoutubeData(videoId),
    enabled: enabled,
  });
  return { error, data, isLoading };
}

export default useYoutubeFecth;
