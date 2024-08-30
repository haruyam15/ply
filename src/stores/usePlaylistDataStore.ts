import { create } from 'zustand';

interface IPlaylistData {
  id: string;
  title: string;
  link?: string[];
  imgUrl: string[];
  channelTitle: string;
}

interface State {
  playlistData: IPlaylistData[];
}
interface Action {
  setPlaylistData: (data: IPlaylistData) => void;
}

const usePlaylistDataStore = create<State & Action>((set) => ({
  playlistData: [],
  setPlaylistData: (data) => set((state) => ({ playlistData: [...state.playlistData, data] })),
}));

export default usePlaylistDataStore;
