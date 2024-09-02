import { create } from 'zustand';

export interface IUser {
  userId: string;
  password: string;
  profileImage: string;
  nickname: string;
  likes: string[];
  followers: string[];
  following: string[];
  myPlaylists: string[];
}

interface State {
  userInformation: IUser;
}
interface Action {
  setUser: (userData: IUser) => void;
  clearUser: () => void;
}

const useUserStore = create<State & Action>((set) => ({
  userInformation: {
    userId: '',
    password: '',
    profileImage: '',
    nickname: '',
    likes: [],
    followers: [],
    following: [],
    myPlaylists: [],
  },
  setUser: (userData) =>
    set(() => ({
      userInformation: {
        userId: userData.userId,
        password: userData.password,
        profileImage: userData.profileImage,
        likes: userData.likes,
        nickname: userData.nickname,
        followers: userData.followers,
        following: userData.following,
        myPlaylists: userData.myPlaylists,
      },
    })),
  clearUser: () =>
    set(() => ({
      userInformation: {
        userId: '',
        password: '',
        profileImage: '',
        likes: [],
        nickname: '',
        followers: [],
        following: [],
        myPlaylists: [],
      },
    })),
}));

export default useUserStore;
