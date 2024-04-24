const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  date: Date,
  notes: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
