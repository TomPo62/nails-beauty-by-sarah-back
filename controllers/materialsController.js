const Material = require('../models/material');
const { validationResult, body } = require('express-validator');

// Validation and sanitization rules as middleware
exports.validate = (method) => {
  switch (method) {
    case 'createMaterial': {
      return [
        body('name', 'Name is required').notEmpty().trim().escape(),
        body('costPerUnit', 'Cost per unit must be a number').isNumeric(),
        body('unit', 'Unit is required').notEmpty().trim().escape(),
        body('quantity', 'Quantity must be a non-negative integer').isInt({ min: 0 }),
        body('description', 'Description must not exceed 500 characters').optional().isLength({ max: 500 }).trim().escape()
      ];
    }
    case 'updateMaterial': {
      return [
        body('name').optional().trim().escape(),
        body('costPerUnit').optional().isNumeric(),
        body('unit').optional().trim().escape(),
        body('quantity').optional().isInt({ min: 0 }),
        body('description').optional().isLength({ max: 500 }).trim().escape()
      ];
    }
  }
};

exports.createMaterial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, costPerUnit, unit, quantity, description } = req.body;
    const material = new Material({ name, costPerUnit, unit, quantity, description });
    await material.save();
    res.status(201).send(material);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find({});
    res.send(materials);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateMaterial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!material) {
      return res.status(404).send();
    }
    res.send(material);
  } catch (error) {
    res.status(400).send(error);
  }
};
