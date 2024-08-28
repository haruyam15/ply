import axios from 'axios';

interface IYoutubeVideoResponse {
  items: Array<{
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
  }>;
}

export default class Youtube {
  async video(videoId: string): Promise<IYoutubeVideoResponse | null> {
    try {
      const response = await axios.get('http://localhost:8080/api/youtube/videos', {
        params: {
          videoId,
          part: 'snippet',
        },
      });

      return response.data.items.length > 0 ? response.data.items[0] : null;
    } catch (error) {
      console.error('Error fetching video data:', error);
      return null;
    }
  }
}
