const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const stockSchema = new mongoose.Schema({
  material: {type: mongoose.Schema.Types.ObjectId, ref: 'Material', required:true},
  quantity: {type: Number, required: true, min:0 },
  minimumRequired: {type: Number, required: true, min: 0},
  lastUpdated: {type: Date, default: Date.now}
}, {
  timestamps:true
})

stockSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Stock', stockSchema)
