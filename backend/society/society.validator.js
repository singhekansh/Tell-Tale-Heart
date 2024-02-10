const { body, param } = require('express-validator');
const utils = require('../utils');

let societyValidators = {};

societyValidators.getAllSocieties = [];

societyValidators.createSociety = [
  body('name')
    .notEmpty()
    .withMessage('Please enter society\'s name.'),
  body('budget')
    .isFloat({ min: 0 })
    .withMessage('Please enter a valid budget.'),
  body('fa_uid')
    .notEmpty()
    .withMessage('Please enter society FA\'s email.'),
  body('secretary_uid')
    .notEmpty()
    .withMessage('Please enter society secretary\'s email.')
];

societyValidators.updateSociety = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Please enter valid name.'),
  body('budget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Please enter a valid budget.'),
  body('fa_uid')
    .optional()
    .notEmpty()
    .withMessage('Please enter society FA\'s email.'),
  body('secretary_uid')
    .optional()
    .notEmpty()
    .withMessage('Please enter society secretary\'s email.')
];

societyValidators.deleteSociety = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
];

module.exports = societyValidators;
