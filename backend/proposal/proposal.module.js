const mongoose = require('mongoose')
const ProgressSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    required: true,
    enum: ["club", "secretary", "club_fa", "society_fa", "chair_sap", "dean_students", "student_office"]
  },
  status: {
    type: String,
    required: true,
    enum: ["approved", "rejected", "waiting"]
  },
  remark: {
    type: String,
    required: true
  },
}, { timestamps: true })

const UpdateSchema = new mongoose.Schema({
  progress: {
    type: [ ProgressSchema ],
    required: true
  }
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
      isDiscarded: {
        type: Boolean,
        default: false
      }
}, { timestamps: true });

ProposalSchema.methods.getCurrentStatus = function () {
  let latestUpdate = null
  this.updates.forEach((update) => {
    if(latestUpdate && latestUpdate.createdAt > update.createdAt) {} 
    else {
      latestUpdate = update
    }
  })

  if(!latestUpdate) {
    console.error("Unable to parse updates. Proposal ID: ", this._id)
    return { progress: [], error: "Data Invalid." }
  }
  
  let latestBlock = null
  latestUpdate.progress.forEach((blk) => {
    if(latestBlock && latestBlock.createdAt > blk.createdAt) {}
    else {
      latestBlock = blk
    }
  })
  if(!latestBlock) {
    console.error("Unable to parse progress. Update ID: ", latestUpdate._id)
    return { error: "Date Invalid." }
  }
  return latestBlock
}

ProposalSchema.methods.isApproved = async function () {
  const status =  this.getCurrentStatus()
  if(status.error) throw new Error(status.error)
  
  return status.user_type === "dean_students" && status === "approved"
}

const Proposal = mongoose.model('Proposal', ProposalSchema);
module.exports = Proposal