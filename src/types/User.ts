import { Playlist } from '@/types/Playlist';

export interface UserData {
  information: UserInformation;
  like: string[];
  following: FollowingFollowers[];
  followers: FollowingFollowers[];
  myPlayList: Playlist[];
}

export interface UserInformation {
  userId: string;
  password: string;
  profileImage: string;
  nickName: string;
}

type FollowingFollowers = Omit<UserInformation, 'password'>;
