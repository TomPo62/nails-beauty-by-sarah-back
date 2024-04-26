const { body } = require('express-validator')

const validateClient = (action) => {
  const commonValidations = [
    body('contact.*.email', 'Each email must be valid.')
      .optional()
      .isEmail()
      .normalizeEmail(),
    body('contact.*.snapchat', 'Snapchat username must be a valid string.')
      .optional()
      .isString()
      .trim(),
    body('contact.*.instagram', 'Instagram username must be a valid string.')
      .optional()
      .isString()
      .trim(),
    body('contact.*.facebook', 'Facebook username must be a valid string.')
      .optional()
      .isString()
      .trim(),
      body('contact.*.numeroTel', 'NumerTel must be a valid string.')
      .optional()
      .isString()
      .trim(),
      body('contact.*.adresse', 'Adresse must be a valid string.')
      .optional()
      .isString()
      .trim(),
    body('preferences').optional().isArray(),
    body('preferences.*', 'Preference must be a valid string.')
      .isString()
      .trim(),
    body('history').optional().isArray(),
    body(
      'history.*',
      'Each history entry must be a valid MongoDB ObjectId.'
    ).isMongoId(),
  ]

  if (action === 'create') {
    return [
      body('name', 'Name is required and must be at least 3 characters.')
        .trim()
        .isLength({ min: 3 }),
      ...commonValidations,
    ]
  } else if (action === 'update') {
    return commonValidations.map((validation) => validation.optional())
  }
}

module.exports = { validateClient }
