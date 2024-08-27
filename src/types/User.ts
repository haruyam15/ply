import { Playlist } from '@/types/Playlist';

export interface UserData {
  information: UserInformation;
  like: string[];
  following: FollowingFollowers[];
  followers: FollowingFollowers[];
  myplaylist: Playlist[];
}

export interface UserInformation {
  userid: string;
  password: string;
  profileimage: string;
  nickname: string;
}

type FollowingFollowers = Omit<UserInformation, 'password'>;
