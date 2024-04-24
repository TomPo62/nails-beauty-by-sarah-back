const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: String,
  costPerUnit: Number,
  unit: String,
  quantity: Number,
  description: String
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
