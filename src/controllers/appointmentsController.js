const Client = require('../models/client')
const Appointment = require('../models/appointment')
const { validationResult } = require('express-validator')


exports.createAppointment = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const appointment = new Appointment(req.body)
  try {
    const savedAppointment = await appointment.save()

    await Client.findByIdAndUpdate(savedAppointment.client, {$push: {history: savedAppointment._id}},
    {new: true, runValidators:true})
    res.status(201).send(savedAppointment)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.updateAppointment = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    res.status(200).json(updatedAppointment)
  } catch (err) {
    res.status(400).json({
      message: 'Error updating appointment',
      errors: err.message || err,
    })
  }
}

exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    )
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }
    res.status(204).send()
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting appointment', error: err.message })
  }
}

exports.getAllAppointments = async (req, res) => {
  const { page = 1, limit = 10, client, service, date } = req.query

  const query = {}
  if (client) query.client = client
  if (service) query.service = service
  if (date) query.date = { $gte: new Date(date) }

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    populate: ['client', 'service'],
  }

  try {
    const result = await Appointment.paginate(query, options)
    res.json(result)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving appointments', error: err.message })
  }
}
