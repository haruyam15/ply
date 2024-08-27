export interface Playlist {
  id2: string;
  link: string[];
  title: string;
  content: string;
  id: string;
  like: string[];
  numoflike: number;
  comments: Comment[];
}

export interface Comment {
  commentscontent: string;
  commentsdate: string;
  commentswriter: string;
}
