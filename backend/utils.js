const { validationResult } = require('express-validator')
const Society = require('./society/society.module')

module.exports.checkErrors = (req, res, next) => {
  const errors = validationResult(req)
  if(errors.isEmpty()) {
    next()
  } else {
    res.status(400).json({ message: `${errors.array()[0].msg}` })
  }
}

module.exports.checkSocietyExists = async (id) => {
  const doesSocietyExists = await Society.findById(id);
  if(!doesSocietyExists) {
    return false
  } else {
    return true
  }
}

module.exports.getLatestBlock = (dataArray) => {
  let t = { createdAt: null }
  dataArray.forEach((data) => {
    if(new Date(t.createdAt).getTime() < new Date(data.createdAt).getTime()) {
      t = data
    }
  })
  if(!t.createdAt) throw new Error('Invalid Data.')
  return t
}