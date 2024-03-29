const mongoose = require('mongoose')

const SocietySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  budget: {
    type: Number, 
    required: true,
  },
  fa_email: {
    type: String,
    required: true
  },
  secretary_email: {
    type: String,
    required: true
  }
  
}, { timestamps: true });

const Society = mongoose.model('Society', SocietySchema);
module.exports = Society