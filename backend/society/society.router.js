const { Router } = require('express');
const societyController = require('./society.controller');
const societyValidators = require('./society.validator');
const societyRouter = Router();
const { checkErrors } = require('../utils');

societyRouter.get('/',
  societyValidators.getAllSocieties,
  checkErrors,
  societyController.getAllSocieties);

societyRouter.post('/',
  societyValidators.createSociety,
  checkErrors,
  societyController.createSociety);

societyRouter.put('/:id',
  societyValidators.updateSociety,
  checkErrors,
  societyController.updateSociety);

societyRouter.delete('/:id',
  societyValidators.deleteSociety,
  checkErrors,
  societyController.deleteSociety);

module.exports = societyRouter;
