const { body, param } = require('express-validator');

const validateStockUpdate = [
  param('materialId', 'Invalid material ID').isMongoId(),
  body('quantity', 'Quantity must be a non-negative integer').isInt({ min: 0 }),
  body('minimumRequired', 'Minimum required must be a non-negative integer').isInt({ min: 0 })
];

module.exports = { validateStockUpdate };
