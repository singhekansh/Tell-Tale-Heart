import { toast } from '@/components/ui/use-toast'
import { ApiWithAuth, API } from '@/lib/axios'
import { create } from 'zustand'

export const useSocietyStore = create((set) => ({
  societies: [],
  getSocieties: async () => {
    let societies = []
    try {
      societies = (await ApiWithAuth.get('/society')).data.data
      set((state) => ({ societies }))
      console.log({societies})
    } catch(err) {
      console.error('Failed to load society', err.response.data.message)
    }
  },
  createSocieties: async (data) => {
    try {
      let newSociety = (await ApiWithAuth.post('/society', data )).data.data
      set((state) => ({ societies: [newSociety, ...state.societies]}))  
    } catch (err) {
      console.error(err)
      toast({
        title: 'Failed to create new society.',
        description: err?.response?.data?.message || err?.message
      })
    }
  },
  updateSociety: async (id, data) => {
    try {
      let newUpdatedSoc = (await ApiWithAuth.put(`/society/${id}`)).data.data
      set((state) => {
        let updatedSocs = state.societies.filter((soc) => soc._id !== id)
        return { societies: [newUpdatedSoc, ...updatedSocs] }
      })
    } catch(err) {
      toast({
        title: 'Failed to update a new society.',
        description: err.response.data.message
      })
    }
  },
  deleteSociety: async (id) => {
    try {
      await ApiWithAuth.delete(`/society/${id}`)
      set((state) => ({ societies: state.societies.filter((soc) => soc._id !== id) }))
    } catch(err) {
      toast({
        title: 'Failed to delete new society.',
        description: err.response.data.message
      })
    }
  }
}))