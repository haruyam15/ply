import { create } from 'zustand';
import axios from 'axios';

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
  fetchFollowers: () => Promise<string[]>;
}

const useUserStore = create<State & Action>((set, get) => ({
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
  fetchFollowers: async () => {
    const { userInformation } = get();
    try {
      const response = await axios.get(`/api/profile/${userInformation.userId}`);
      return response.data.followers;
    } catch (error) {
      console.error('Failed to fetch followers:', error);
      return [];
    }
  },
}));

export default useUserStore;
