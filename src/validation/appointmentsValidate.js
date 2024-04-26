const { body } = require('express-validator');

exports.validateAppointmentCreation = [
  body('client', 'Client ID is required').isMongoId(),
  body('service', 'Service ID is required').isMongoId(),
  body('date', 'Valid date is required').isISO8601().toDate(),
  body('notes').optional().trim(),
];

exports.validateAppointmentUpdate = [
  body('client', 'Client ID must be valid').optional().isMongoId(),
  body('service', 'Service ID must be valid').optional().isMongoId(),
  body('date', 'Valid date is required').optional().isISO8601().toDate(),
  body('notes').optional().trim(),
];
