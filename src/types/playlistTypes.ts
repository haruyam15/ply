export interface IPlaylist {
  id: string;
  _id: string;
  link: string[];
  title: string;
  content: string;
  userId: string;
  like: string[];
  numoflike: number;
  comments: IComment[];
  date: string;
  disclosureStatus: boolean;
  tags: string[];
  imgUrl: string;
}

export interface IComment {
  commentsContent: string;
  commentsDate: string;
  commentsWriter: string;
}

export interface PlaylistDataStore {
  title: string;
  content: string;
  disclosureStatus: boolean;
  tags: string[];
}

export interface NewPlaylistData extends PlaylistDataStore {
  userId: string;
  link: (string | undefined)[];
  imgUrl: string[];
}
