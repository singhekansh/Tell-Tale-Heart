import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (data) => set((state) => data),
  logout: () => set((state) => ({ user: null, token: null }))
}))