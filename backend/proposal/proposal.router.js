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

proposalRouter.post('/approveBySecretary/:id',
  proposalValidators.approveBySecretary,
  checkErrors,
  proposalController.approveBySecretary
)

proposalRouter.post('/approveByClubFA/:id',
  proposalValidators.approveByClubFA,
  checkErrors,
  proposalController.approveByClubFA
)

proposalRouter.post('/approveBySocietyFA/:id',
  proposalValidators.approveBySocietyFA,
  checkErrors,
  proposalController.approveBySocietyFA
)

proposalRouter.post('/approveByCSAP/:id',
  proposalValidators.approveByCSAP,
  checkErrors,
  proposalController.approveByCSAP
)

proposalRouter.post('/approveByDeanStudents/:id',
  proposalValidators.approveByDeanStudents,
  checkErrors,
  proposalController.approveByDeanStudents
)

module.exports = proposalRouter