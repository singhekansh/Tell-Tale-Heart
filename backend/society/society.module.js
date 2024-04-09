const mongoose = require('mongoose')
const Clubs = require('../club/club.module')

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

SocietySchema.methods.getBudgetSpent = async function () {
  const clubs = await Clubs.find({ society: this._id }, '_id')
  let amountSpentArray = await Promise.all(clubs.map(async (club) => await club.getBudgetSpent()))
  return amountSpentArray.reduce((acc, i) => acc + i, 0)
}

const Society = mongoose.model('Society', SocietySchema);
module.exports = Society