const { body } = require('express-validator');

const validateServiceCreation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().trim(),
  body('basePrice')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),
  body('materials.*.material')
    .notEmpty()
    .withMessage('Material ID is required'),
  body('materials.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('duration').optional().isFloat({ min: 0 }),
  body('discountRate').optional().isFloat({ min: 0, max: 100 })
];

const validateServiceUpdate = [
  body('name').optional().trim(),
  body('description').optional().trim(),
  body('basePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number if specified'),
  body('materials.*.material')
    .optional()
    .notEmpty()
    .withMessage('Material ID is required if specified'),
  body('materials.*.quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1 if specified'),
  body('duration').optional().isFloat({ min: 0 }),
  body('discountRate').optional().isFloat({ min: 0, max: 100 })
];

module.exports = {
  validateServiceCreation,
  validateServiceUpdate
};
