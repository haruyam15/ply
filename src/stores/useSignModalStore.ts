import { create } from 'zustand';

interface SignModals {
  modalName: string;
  modalState: boolean;
}

interface State {
  signModals: SignModals;
}

interface Actions {
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}

const useSignModalStore = create<State & Actions>((set) => ({
  signModals: {
    modalName: '',
    modalState: false,
  },
  openModal: (modalName) =>
    set(() => ({
      signModals: {
        modalName,
        modalState: true,
      },
    })),
  closeModal: (modalName) =>
    set((state) =>
      state.signModals.modalName === modalName
        ? {
            signModals: {
              modalName: '',
              modalState: false,
            },
          }
        : state,
    ),
}));

export default useSignModalStore;
