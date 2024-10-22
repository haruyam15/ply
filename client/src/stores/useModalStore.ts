import { create } from 'zustand';

interface IModals {
  modalName: string;
  modalState: boolean;
}

interface State {
  modals: IModals;
}

interface Actions {
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}

const useModalStore = create<State & Actions>((set) => ({
  modals: {
    modalName: '',
    modalState: false,
  },
  openModal: (modalName) =>
    set(() => ({
      modals: {
        modalName,
        modalState: true,
      },
    })),
  closeModal: (modalName) =>
    set((state) =>
      state.modals.modalName === modalName
        ? {
            modals: {
              modalName: '',
              modalState: false,
            },
          }
        : state,
    ),
}));

export default useModalStore;
