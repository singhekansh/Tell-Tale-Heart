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
  }
}, { timestamps: true });

const Club = mongoose.model('Club', ClubSchema);
module.exports = Club