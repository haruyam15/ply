import { create } from 'zustand';
import { IUserData } from '@/types/userTypes';
import { persist } from 'zustand/middleware';
interface State {
  userInformation: IUserData;
}

interface Action {
  setUser: (userData: IUserData) => void;
}

const useUserStore = create(
  persist<State & Action>(
    (set) => ({
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
      setUser: (userData: IUserData) =>
        set(() => ({
          userInformation: userData,
        })),
    }),
    {
      name: 'userInformation',
    },
  ),
);

export default useUserStore;
