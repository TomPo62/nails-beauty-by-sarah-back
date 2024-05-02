const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const materialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    costPerUnit: { type: Number, min: 0, required: true },
    contentQuantity: { type: Number, min: 0 },
    unit: { type: String },
    description: { type: String, trim: true },
    category: { type: String, required: true },
    supplier: {
      name: String,
      contact: String,
      notes: String,
    },
    stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
  },
  {
    timestamps: true,
  }
)

materialSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Material', materialSchema)
