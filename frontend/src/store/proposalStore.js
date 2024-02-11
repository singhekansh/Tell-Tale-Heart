import { toast } from '@/components/ui/use-toast';
import { ApiWithAuth } from '@/lib/axios';
import { create } from 'zustand';

export const useProposalStore = create((set) => ({
  proposals: [],
  getProposals: async () => {
    try {
      const proposals = (await ApiWithAuth.get('/proposal')).data.data;
      set({ proposals });
    } catch (err) {
      console.error('Failed to load proposals', err.response.data.message);
    }
  },
  createProposal: async (data) => {
    try {
      const newProposal = (await ApiWithAuth.post('/proposal', data)).data.data;
      set((state) => ({ proposals: [newProposal, ...state.proposals] }));
    } catch (err) {
      toast({
        title: 'Failed to create a new proposal.',
        description: err.response.data.message,
      });
    }
  },
  updateProposal: async (id, data) => {
    try {
      const newUpdatedProposal = (await ApiWithAuth.put(`/proposal/${id}`, data)).data.data;
      set((state) => {
        const updatedProposals = state.proposals.map((proposal) =>
          proposal._id === id ? newUpdatedProposal : proposal
        );
        return { proposals: updatedProposals };
      });
    } catch (err) {
      toast({
        title: 'Failed to update a proposal.',
        description: err.response.data.message,
      });
    }
  },
  deleteProposal: async (id) => {
    try {
      await ApiWithAuth.delete(`/proposal/${id}`);
      set((state) => ({ proposals: state.proposals.filter((proposal) => proposal._id !== id) }));
    } catch (err) {
      toast({
        title: 'Failed to delete a proposal.',
        description: err.response.data.message,
      });
    }
  },
  approveProposalBySecretary: async (id, data) => {
    try {
      const newApprovedProposal = (await ApiWithAuth.put(`/proposal/approveBySecretary/${id}`, data)).data.data;
      set((state) => {
        const approvedProposals = state.proposals.map((proposal) =>
          proposal._id === id ? newApprovedProposal : proposal
        );
        return { proposals: approvedProposals };
      });
    } catch (err) {
      toast({
        title: 'Failed to approve a proposal.',
        description: err.response.data.message,
      });
    }
  },
  approveProposalByClubFA: async (id, data) => {
    try {
      const newApprovedProposal = (await ApiWithAuth.put(`/proposal/approveByClubFA/${id}`, data)).data.data;
      set((state) => {
        const approvedProposals = state.proposals.map((proposal) =>
          proposal._id === id ? newApprovedProposal : proposal
        );
        return { proposals: approvedProposals };
      });
    } catch (err) {
      toast({
        title: 'Failed to approve a proposal.',
        description: err.response.data.message,
      });
    }
  },
  approveProposalBySocietyFA: async (id, data) => {
    try {
      const newApprovedProposal = (await ApiWithAuth.put(`/proposal/approveBySocietyFA/${id}`, data)).data.data;
      set((state) => {
        const approvedProposals = state.proposals.map((proposal) =>
          proposal._id === id ? newApprovedProposal : proposal
        );
        return { proposals: approvedProposals };
      });
    } catch (err) {
      toast({
        title: 'Failed to approve a proposal.',
        description: err.response.data.message,
      });
    }
  },
  approveProposalByCSAP: async (id, data) => {
    try {
      const newApprovedProposal = (await ApiWithAuth.put(`/proposal/approveByCSAP/${id}`, data)).data.data;
      set((state) => {
        const approvedProposals = state.proposals.map((proposal) =>
          proposal._id === id ? newApprovedProposal : proposal
        );
        return { proposals: approvedProposals };
      });
    } catch (err) {
      toast({
        title: 'Failed to approve a proposal.',
        description: err.response.data.message,
      });
    }
  },
  approveProposalByDeanStudents: async (id, data) => {
    try {
      const newApprovedProposal = (await ApiWithAuth.put(`/proposal/approveByDeanStudents/${id}`, data)).data.data;
      set((state) => {
        const approvedProposals = state.proposals.map((proposal) =>
          proposal._id === id ? newApprovedProposal : proposal
        );
        return { proposals: approvedProposals };
      });
    } catch (err) {
      toast({
        title: 'Failed to approve a proposal.',
        description: err.response.data.message,
      });
    }
  },
}));
