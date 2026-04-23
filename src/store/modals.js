import { create } from 'zustand'

const initialState = {
  openModal: () => {},
  closeModal: () => {},
  modals: {
    confirm: false,
    depositConfirm: false,
    userHistory: false,
    userBalanceCancel: false,
  },
}

const modalsStore = create((set) => ({
  ...initialState,
  openModal: async (modalName) => {
    set((state) => ({ modals: { ...state.modals, [modalName]: true } }))
  },
  closeModal: async (modalName) => {
    set((state) => ({ modals: { ...state.modals, [modalName]: false } }))
  },
}))

export default modalsStore
