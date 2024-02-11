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
    .notEmpty()
    .withMessage('Please enter sub category.'),
  body('section')
    .notEmpty()
    .withMessage('Please enter section.'),
  body('head')
    .notEmpty()
    .withMessage('Please enter budget head.'),
  body('fund')
    .notEmpty()
    .withMessage('Please enter fund.'),
  body('payment')
    .notEmpty()
    .withMessage('Please enter pass of payment.'),
  body('type')
    .notEmpty()
    .withMessage('Please enter bill settlement type.'),
  body('purpose')
    .notEmpty()
    .withMessage('Please enter purpose of proposal.'),
  body('club')
    .notEmpty()
    .withMessage('Please enter club.'),
  body('updates')
    .notEmpty()
    .withMessage('Please enter updates.'),
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

proposalValidators.approveBySecretary = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
  body('remark')
    .isString()
    .withMessage("Invalid remark.")
]

proposalValidators.approveByClubFA = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
  body('remark')
    .isString()
    .withMessage("Invalid remark.")
]

proposalValidators.approveBySocietyFA = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
  body('remark')
    .isString()
    .withMessage("Invalid remark.")
]

proposalValidators.approveByCSAP = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request.'),
  body('remark')
    .isString()
    .withMessage("Invalid remark.")
]

proposalValidators.approveByDeanStudents = [
  param('id')
    .notEmpty()
    .withMessage('Invalid Request'),
  body('remark')
    .isString()
    .withMessage('Invalid remark.')
]

module.exports = proposalValidators;
