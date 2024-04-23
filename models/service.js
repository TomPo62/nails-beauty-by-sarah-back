const mongoose = require('mongoose');
const serviceMaterialSchema = new mongoose.Schema({
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required:true },
    quantity: {type:Number, required:true, min:0}
});
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    basePrice: { type: Number, required: true, min: 0 },
    materials: [serviceMaterialSchema],
    duration: { type: Number, min: 0 },
    hourlyRate: { type: Number, min: 0 },
    discountRate: { type: Number, default: 0, min: 0, max: 100 }
});
module.exports = mongoose.model('Service', serviceSchema);
