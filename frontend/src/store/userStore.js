import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  user_type: null,
  setUser: (data) => set((state) => ({ ...state, ...data })),
  logout: () => set((state) => ({ user: null, token: null })),
}))