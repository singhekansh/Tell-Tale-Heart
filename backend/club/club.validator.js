const { body, param } = require('express-validator')
const utils = require('../utils')

let clubValidators = {}

clubValidators.getAllClubs = []

clubValidators.createNewClub = [
  body('name')
    .notEmpty()
    .withMessage('Please enter club\'s name.'),
  body('society')
    .notEmpty()
    .withMessage('Please select clubs\'s society.')
    .custom(utils.checkErrors)
    .withMessage('Selected society does not exist.'),
  body('budget')
    .isFloat({ min: 0 })
    .withMessage('Please enter club\'s budget.'),
  body('fa_uid')
    .notEmpty()
    .withMessage('Please enter club FA\'s email.'),
  body('coordinator_uid')
    .notEmpty()
    .withMessage('Please enter club coordinator\'s email.')
]

clubValidators.updateClub = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Please enter valid name.'),
  body('society')
    .optional()
    .notEmpty()
    .withMessage('Please select clubs\'s society.')
    .custom(utils.checkErrors)
    .withMessage('Selected society does not exist.'),
  body('budget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Please enter club\'s budget.'),
  body('fa_uid')
    .optional()
    .notEmpty()
    .withMessage('Please enter club FA\'s email.'),
  body('coordinator_uid')
    .optional()
    .notEmpty()
    .withMessage('Please enter club coordinator\'s email.')
]

clubValidators.deleteClub = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
]

module.exports = clubValidators