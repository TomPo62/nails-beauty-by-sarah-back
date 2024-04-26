const express = require('express')
const appointmentsController = require('../controllers/appointmentsController')
const {validateAppointmentCreation, validateAppointmentUpdate} = require('../validation/appointmentsValidate')
const router = express.Router()

router.post('/', validateAppointmentCreation, appointmentsController.createAppointment)
router.put('/:id', validateAppointmentUpdate, appointmentsController.updateAppointment)
router.delete('/:id', appointmentsController.deleteAppointment)
router.get('/', appointmentsController.getAllAppointments)

module.exports = router
