import { create } from 'zustand';

interface IUseNavState {
  isExpand: boolean;
  toggleExpand: (newState: boolean) => void;
}

const useNavStore = create<IUseNavState>((set) => ({
  isExpand: true,
  toggleExpand: (newState) => set({ isExpand: newState }),
}));

export default useNavStore;
