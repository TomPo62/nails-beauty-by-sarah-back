const Appointment = require('../models/appointment')

exports.createAppointment = async (req, res) => {
  const appointment = new Appointment(req.body)
  try {
    await appointment.save()
    res.status(201).send(appointment)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('client')
      .populate('service')
    res.send(appointments)
  } catch (err) {
    res.status(500).send(err)
  }
}
