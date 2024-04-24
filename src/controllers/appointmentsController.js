const Appointment = require('../models/appointment');

exports.createAppointment = async (req, res) => {
  const appointment = new Appointment(req.body);
  try {
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('client').populate('service');
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
};
