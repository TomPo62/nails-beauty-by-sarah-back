const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  contact: String,
  preferences: [String],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

module.exports = mongoose.model('Client', clientSchema);
