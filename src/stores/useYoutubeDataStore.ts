import { create } from 'zustand';

export interface IYoutubelistData {
  id?: string;
  title?: string;
  link?: string[];
  imgUrl?: string[];
  channelTitle?: string;
}

interface State {
  youTubelistData: IYoutubelistData[];
}
interface Action {
  setYouTubelistData: (data: IYoutubelistData) => void;
  draggabledData: (arrData: IYoutubelistData[]) => void;
  clearYoutubelistData: () => void;
}

const useYoutubeDataStore = create<State & Action>((set) => ({
  youTubelistData: [],
  setYouTubelistData: (data) =>
    set((state) => ({ youTubelistData: [...state.youTubelistData, data] })),
  draggabledData: (arrData) => set(() => ({ youTubelistData: arrData })),
  clearYoutubelistData: () => set(() => ({ youTubelistData: [] })),
}));

export default useYoutubeDataStore;
