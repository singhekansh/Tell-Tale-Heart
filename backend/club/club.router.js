const { Router } = require('express')
const clubController = require('./club.controller')
const clubValidators = require('./club.validator')
const clubRouter = Router()
const { checkErrors } = require('../utils')

clubRouter.get('/',  
  clubValidators.getAllClubs,
  checkErrors,
  clubController.getAllClubs)

clubRouter.post('/',
  clubValidators.createNewClub,
  checkErrors,
  clubController.createNewClub)

clubRouter.put('/:id', 
  clubValidators.updateClub,
  checkErrors,
  clubController.updateClub)

clubRouter.delete('/:id', 
  clubValidators.deleteClub,
  checkErrors,
  clubController.deleteClub)

module.exports = clubRouter