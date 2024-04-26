const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  costPerUnit: { type: Number, min: 0, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, min: 0, required: true },
  description: { type: String, trim: true },
})

materialSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('Material', materialSchema)
