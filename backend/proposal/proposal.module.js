const mongoose = require('mongoose')

const UpdateSchema = new mongoose.Schema({
  progress: {
    type: [ ProgressSchema ],
    required: true
  }
}, { timestamps: true })

const ProgressSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  remark: {
    type: String,
    required: true
  },
}, { timestamps: true })

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
      club_email: {
        type: String,
        required: true
      },
      updates: {
        type: [ UpdateSchema ],
        required: true
      },
}, { timestamps: true });

const Proposal = mongoose.model('Proposal', ProposalSchema);
module.exports = Proposal