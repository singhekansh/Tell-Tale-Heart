import { toast } from '@/components/ui/use-toast'
import { ApiWithAuth } from '@/lib/axios'
import { create } from 'zustand'

export const useClubStore = create((set) => ({
  clubs: [],
  getClubs: async () => {
    let clubs = []
    try {
      clubs = (await ApiWithAuth.get('/clubs')).data.data
      set((state) => clubs)
    } catch(err) {
      console.error('Failed to load clubs', err.response.data.message)
    }
  },
}))