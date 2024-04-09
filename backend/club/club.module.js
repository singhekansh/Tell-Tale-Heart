const mongoose = require('mongoose')

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  society: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society'
  },
  budget: {
    type: Number, 
    required: true,
    min: 0
  },
  fa_email: {
    type: String,
    required: true
  },
  coordinator_email: {
    type: String,
    required: true
  },
  proposals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proposal'
  }]
}, { timestamps: true });

ClubSchema.methods.getBudgetSpent = async function () {
  await this.populate({ path: 'proposals', match: { isDiscarded: false } })

  if(!this.proposals) return 0
  const moneySpent = this.proposals.reduce((sum, proposal) => {
    return proposal.isApproved() ? sum + proposal.amount : sum
  }, 0)

  return moneySpent
}

const Club = mongoose.model('Club', ClubSchema);
module.exports = Club