const { Router } = require('express')
const proposalController = require('./proposal.controller')
const proposalValidators = require('./proposal.validator')
const proposalRouter = Router()
const { checkErrors } = require('../utils')

proposalRouter.get('/',  
  proposalValidators.getAllProposals,
  checkErrors,
  proposalController.getAllProposals)

proposalRouter.post('/',
  proposalValidators.createNewProposal,
  checkErrors,
  proposalController.createNewProposal)

proposalRouter.put('/:id', 
  proposalValidators.updateProposal,
  checkErrors,
  proposalController.updateProposal)

proposalRouter.delete('/:id', 
  proposalValidators.deleteProposal,
  checkErrors,
  proposalController.deleteProposal)

module.exports = proposalRouter