import { create } from "zustand";

export const useProposalStore = create((set) => ({
  proposals: [],
  addProposal: (proposal) =>
    set((state) => ({ proposals: [...state.proposals, proposal] })),
  removeProposal: (proposalId) =>
    set((state) => ({
      proposals: state.proposals.filter(
        (proposal) => proposal.id !== proposalId
      ),
    })),
}));
