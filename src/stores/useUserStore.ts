import { create } from 'zustand';
import { IUserData } from '@/types/userTypes';
interface State {
  userInformation: IUserData;
}
interface Action {
  setUser: (userData: IUserData) => void;
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
