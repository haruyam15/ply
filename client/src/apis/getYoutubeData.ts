import { IYoutubeVideoResponse } from '@/types/youtubeResponseTypes';
import axios from 'axios';

const getYoutubeData = async (videoId: string): Promise<IYoutubeVideoResponse> => {
  try {
    const response = await axios.get('https://plyserver.kro.kr/api/youtube/videos', {
      params: {
        id: videoId,
        part: 'snippet',
      },
    });
    return response.data;
  } catch (error) {
    console.error('유튜브 데이터 호출을 실패했습니다.:', error);
    throw error;
  }
};

export default getYoutubeData;
