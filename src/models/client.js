const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  snapchat: { type: String, unique: true, sparse: true },
  instagram: { type: String, unique: true, sparse: true },
  facebook: { type: String, unique: true, sparse: true },
  numeroTel: { type: String, unique: true, sparse: true },
  adresse: { type: String, unique: true, sparse: true },
})

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  contact: [contactSchema],
  preferences: [{ type: String }],
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
}, {
  timestamps: true
})

clientSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Client', clientSchema)
