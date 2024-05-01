const mongoose = require('mongoose')

const { validationResult } = require('express-validator')
const Society = require('./society/society.module')
const Club = require('./club/club.module')

const checkErrors = (req, res, next) => {
  const errors = validationResult(req)
  if(errors.isEmpty()) {
    next()
  } else {
    res.status(400).json({ message: `${errors.array()[0].msg}` })
  }
}

const nextApprovalBlock = (progressChain, proposalBudget, clubName, societyName, assignIds = true) => {
  const latestBlk = getLatestBlock(progressChain);
  let data = null;

  if(latestBlk.user_type === "club") {
    if(latestBlk.status === "approved") {}
      data = ({ 
        user: proposalBudget > 15000 ? `Secretary - ${societyName}` : `FA - ${clubName}`, 
        user_type: proposalBudget > 15000 ? "secretary" : `club_fa` , 
        status: "waiting", 
        remark: "",
        createdAt: new Date().toISOString()
      })
  } 

  else if(latestBlk.user_type === "secretary") {
    if(latestBlk.status === "approved" || latestBlk.status === "waiting") 
      data = ({ 
        user: `FA - ${clubName}`, 
        user_type: "club_fa", 
        status: "waiting", 
        remark: "",
        createdAt: new Date().toISOString()
      })
  } 

  else if(latestBlk.user_type === "club_fa") {
    if(latestBlk.status === "approved" || latestBlk.status === "waiting") 
      data = ({ 
        user: `FA - ${societyName}`, 
        user_type: "society_fa", 
        status: "waiting", 
        remark: "",
        createdAt: new Date().toISOString()
      })
  } 
  else if(latestBlk.user_type === "society_fa") {
    if(proposalBudget <= 15000) return null
    if(latestBlk.status === "approved" || latestBlk.status === "waiting") 
      data = ({ 
        user: `Chair CSAP`, 
        user_type: "csap", 
        status: "waiting", 
        remark: "",
        createdAt: new Date().toISOString()
      })
  } 
  else if(latestBlk.user_type === "csap") {
    if(proposalBudget <= 50000) return null
    if(latestBlk.status === "approved" || latestBlk.status === "waiting") 
      data = ({ 
        user: `Dean Students`, 
        user_type: `dean_students`, 
        status: "waiting", 
        remark: "",
        createdAt: new Date().toISOString()
      })
  } 
  else {
    return null
  } 
  data._id = new mongoose.Types.ObjectId()
  progressChain.push(data)
  return progressChain
}
 
const populateApprovalChain = async (proposal) => {
  try {

    const club = await Club.findById(proposal.club._id, '');
    const society = await Society.findById(proposal.club.society._id);
    
    if(!club) throw new Error("Cannot find club.")
    if(!society) throw new Error("Cannot find society.")
    const isClubBudgetExceeded = await club.getBudgetSpent() + proposal.amount > club.budget
    const isSocietyBudgetExceeded = await society.getBudgetSpent() + proposal.amount > society.budget
    
    const latestUpdateChain = getLatestBlock(proposal.updates);
    
    while(nextApprovalBlock(latestUpdateChain.progress, proposal.amount, club.name, society.name, isClubBudgetExceeded, isSocietyBudgetExceeded)) {
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 10)
      })
    }
    return proposal
  } catch(err) {
    console.error(err)
    return proposal
  }

} 

const checkSocietyExists = async (id) => {
  const doesSocietyExists = await Society.findById(id);
  if(!doesSocietyExists) {
    return false
  } else {
    return true
  }
}

const getLatestBlock = (dataArray) => {
  let t = { createdAt: null }
  dataArray.forEach((data) => {
    if(new Date(t.createdAt).getTime() < new Date(data.createdAt).getTime()) {
      t = data
    }
  })
  if(!t.createdAt) throw new Error('Invalid Data.')
  return t
}

module.exports = {
  checkErrors,
  nextApprovalBlock,
  populateApprovalChain,
  checkSocietyExists,
  getLatestBlock
}