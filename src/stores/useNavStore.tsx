import { create } from 'zustand'

const useNavStore = create<useNavState>((set) => ({
	isExpand: true,
	setExpand: () => set((state) => ({ isExpand: !state.isExpand })),
}))

export default useNavStore

interface useNavState {
	isExpand: boolean
	setExpand: (newState: boolean) => void
}
