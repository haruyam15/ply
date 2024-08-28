export interface Playlist {
  id2: string;
  link: string[];
  title: string;
  content: string;
  userId: string;
  like: string[];
  numoflike: number;
  comments: Comment[];
  date: string;
  disclosureStatus: boolean;
  tags: string[];
}

export interface Comment {
  commentscontent: string;
  commentsdate: string;
  commentswriter: string;
}
