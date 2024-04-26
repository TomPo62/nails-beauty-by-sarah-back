const { body } = require('express-validator')

// Validation and sanitization rules as middleware
const validateMaterialCreation = [
  body('name', 'Name is required').notEmpty().trim(),
  body('costPerUnit', 'Cost per unit must be a number').isNumeric(),
  body('unit', 'Unit is required').notEmpty().trim(),
  body('quantity', 'Quantity must be a non-negative integer').isInt({ min: 0 }),
  body('description', 'Description must not exceed 500 characters')
    .optional()
    .isLength({ max: 500 })
    .trim(),
]

const validateMaterialUpdate = [
  body('name').optional().trim(),
  body('costPerUnit').optional().isNumeric(),
  body('unit').optional().trim(),
  body('quantity').optional().isInt({ min: 0 }),
  body('description').optional().isLength({ max: 500 }).trim(),
]

module.exports = {
  validateMaterialCreation,
  validateMaterialUpdate,
}
