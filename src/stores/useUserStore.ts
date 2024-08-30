import { create } from 'zustand';
import axios from 'axios';

interface IInformation {
  _id: string;
  userid: string;
  password: string;
  profileimage: string;
  nickname: string;
}

export interface IUser {
  information: IInformation;
  followers: string[];
  following: string[];
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
    information: {
      _id: '',
      userid: '',
      password: '',
      profileimage: '',
      nickname: '',
    },
    followers: [],
    following: [],
  },
  setUser: (userData) =>
    set(() => ({
      userInformation: {
        information: {
          _id: userData.information._id,
          userid: userData.information.userid,
          password: userData.information.password,
          profileimage: userData.information.profileimage,
          nickname: userData.information.nickname,
        },
        followers: userData.followers,
        following: userData.following,
      },
    })),
  clearUser: () =>
    set(() => ({
      userInformation: {
        information: {
          _id: '',
          userid: '',
          password: '',
          profileimage: '',
          nickname: '',
        },
        followers: [],
        following: [],
      },
    })),
  fetchFollowers: async () => {
    const { userInformation } = get();
    try {
      const response = await axios.post('/api/followers', {
        userid: userInformation.information.userid,
      });
      return response.data.followers;
    } catch (error) {
      console.error('Failed to fetch followers:', error);
      return [];
    }
  },
}));

export default useUserStore;
