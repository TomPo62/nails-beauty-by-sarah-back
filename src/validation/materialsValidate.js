const { body } = require('express-validator')

const validateMaterialCreation = [
  body('name', 'Name is required').notEmpty().trim(),
  body('costPerUnit', 'Cost per unit must be a number').notEmpty().isNumeric(),
  body('contentQuantity', 'contentQuantity must be a number').optional().isNumeric(),
  body('unit', 'Unit must be a string').optional().trim(),
  body('description', 'Description must not exceed 500 characters')
    .optional()
    .isLength({ max: 500 })
    .trim(),
  body('category', 'Category is required').notEmpty().trim(),
  body('supplier.name').optional().trim(),
  body('supplier.contact').optional().trim(),
  body('supplier.notes').optional().trim(),
]

const validateMaterialUpdate = [
  body('name').optional().trim(),
  body('costPerUnit').optional().isNumeric(),
  body('contentQuantity', 'contentQuantity must be a number').optional().isNumeric(),
  body('unit').optional().trim(),
  body('description').optional().isLength({ max: 500 }).trim(),
  body('category').optional().trim(),
  body('supplier.name').optional().trim(),
  body('supplier.contact').optional().trim(),
  body('supplier.notes').optional().trim(),
]

module.exports = {
  validateMaterialCreation,
  validateMaterialUpdate,
}
