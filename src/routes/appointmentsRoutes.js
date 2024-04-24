const express = require('express');
const appointmentsController = require('../controllers/appointmentsController');
const router = express.Router();

router.post('/', appointmentsController.createAppointment);
router.get('/', appointmentsController.getAllAppointments);

module.exports = router;
