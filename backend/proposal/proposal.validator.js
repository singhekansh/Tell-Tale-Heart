const { body, param } = require('express-validator');
const utils = require('../utils');

let proposalValidators = {};

proposalValidators.getAllProposals = [];

proposalValidators.createNewProposal = [
  body('title')
    .notEmpty()
    .withMessage('Please enter proposal\'s title.'),
  body('bill')
    .notEmpty()
    .withMessage('Please enter valid bill number.'),
  body('supplier')
    .notEmpty()
    .withMessage('Please enter supplier\'s name.'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Please enter a valid quantity.'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Please enter a valid amount.'),
  body('description')
    .notEmpty()
    .withMessage('Please enter description of the item.'),
  body('category')
    .isString()
    .withMessage('Please enter sub category.'),
  body('section')
    .isString()
    .withMessage('Please enter section.'),
  body('head')
    .notEmpty()
    .withMessage('Please enter budget head.'),
  body('fund')
    .isString()
    .withMessage('Please enter fund.'),
  body('payment')
    .isString()
    .withMessage('Please enter pass of payment.'),
  body('type')
    .isString()
    .withMessage('Please enter bill settlement type.'),
  body('purpose')
    .notEmpty()
    .withMessage('Please enter purpose of proposal.'),
];

proposalValidators.updateProposal = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Please enter valid title.'),
  body('bill')
    .optional()
    .notEmpty()
    .withMessage('Please enter valid bill number.'),
  body('supplier')
    .optional()
    .notEmpty()
    .withMessage('Please enter supplier\'s name.'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Please enter a valid quantity.'),
  body('amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Please enter a valid amount.'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Please enter description of the item.'),
  body('category')
    .optional()
    .notEmpty()
    .withMessage('Please enter sub category.'),
  body('section')
    .optional()
    .notEmpty()
    .withMessage('Please enter section.'),
  body('head')
    .optional()
    .notEmpty()
    .withMessage('Please enter budget head.'),
  body('fund')
    .optional()
    .notEmpty()
    .withMessage('Please enter fund.'),
  body('payment')
    .optional()
    .notEmpty()
    .withMessage('Please enter pass of payment.'),
  body('type')
    .optional()
    .notEmpty()
    .withMessage('Please enter bill settlement type.'),
  body('purpose')
    .optional()
    .notEmpty()
    .withMessage('Please enter purpose of proposal.'),
  body('club')
    .optional()
    .notEmpty()
    .withMessage('Please enter club.'),
  body('updates')
    .optional()
    .notEmpty()
    .withMessage('Please enter updates.'),
];

proposalValidators.deleteProposal = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
];

proposalValidators.approveProposal = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
  body("remark")
    .notEmpty()
    .withMessage('Please enter your remark')
]

proposalValidators.rejectProposal = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
  body("remark")
    .notEmpty()
    .withMessage('Please enter your remark')
]

module.exports = proposalValidators;
