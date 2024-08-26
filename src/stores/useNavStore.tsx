import { create } from 'zustand';

const useNavStore = create<useNavState>((set) => ({
  isExpand: true,
  toggleExpand: (newState) => set(() => ({ isExpand: newState })),
}));

export default useNavStore;
interface useNavState {
  isExpand: boolean;
  toggleExpand: (newState: boolean) => void;
}
