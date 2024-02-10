const mongoose = require('mongoose')

const ProposalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      bill: {
        type: String,
        required: true
      },
      supplier: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      section: {
        type: String,
        required: true
      },
      head: {
        type: String,
        required: true
      },
      fund: {
        type: String,
        required: true
      },
      payment: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      purpose: {
        type: String,
        required: true
      },
      club: {
        type: String,
        required: true
      },
      updates: {
        type: Array,
        required: true
      },
}, { timestamps: true });

const Proposal = mongoose.model('Proposal', ProposalSchema);
module.exports = Proposal