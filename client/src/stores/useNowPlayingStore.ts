import { create } from 'zustand';

interface IUseNowPlayingStore {
  playingVideoId: string;
  setPlayingVideoId: (nextVideoId: string) => void;
}

const useNowPlayingStore = create<IUseNowPlayingStore>((set) => ({
  playingVideoId: '',
  setPlayingVideoId: (nextVideoId) => set({ playingVideoId: nextVideoId }),
}));

export default useNowPlayingStore;
