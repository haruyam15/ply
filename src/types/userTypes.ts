import { IPlaylist } from '@/types/playlistTypes';

export interface IUserData {
  information: IUserInformation;
  like: string[];
  following: FollowingFollowers[];
  followers: FollowingFollowers[];
  myplaylist: IPlaylist[];
}

export interface IUserInformation {
  userid: string;
  password: string;
  profileimage: string;
  nickname: string;
}

type FollowingFollowers = Omit<IUserInformation, 'password'>;
