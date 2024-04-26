const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const appointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  date: { type: Date, required: true },
  notes: { type: String },
})

appointmentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Appointment', appointmentSchema)
