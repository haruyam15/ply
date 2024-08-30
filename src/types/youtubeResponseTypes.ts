// Thumbnail 객체 정의
interface IThumbnail {
  url: string;
  width: number;
  height: number;
}

// Snippet 객체 정의
export interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: IThumbnail;
    medium: IThumbnail;
    high: IThumbnail;
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}
// YouTube 비디오 아이템 정의
interface IVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: ISnippet;
}

// 비디오 응답 정의
export interface IYoutubeVideoResponse {
  kind: string;
  etag: string;
  items: IVideoItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
