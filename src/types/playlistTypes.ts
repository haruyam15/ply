export interface IPlaylist {
  title: string;
  content: string;
  link: string[];
  like: number;
  comments: IComment[];
  userId: string;
  date: string;
  tags: string[];
  imgUrl: string[];
  profileImage: string;
  userName: string;
}

export interface IComment {
  commentsWriter: string;
  commentsContent: string;
  commentsDate: string;
  profileImage: string;
  userName: string;
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
  imgUrl: (string | undefined)[];
}
export interface UserPlyDataStore extends PlaylistDataStore {
  comments: IComment[];
  content: string;
  date: string;
  userName: string;
  profileImage: string;
  imgUrl: (string | undefined)[];
}
