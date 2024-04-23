const Service = require('../models/service');

const { validationResult, body } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
      case 'createService':
      case 'updateService': {
        return [
          body('name').notEmpty().withMessage('Name is required'),
          body('description').optional().trim(),
          body('basePrice').isFloat({ min: 0 }).withMessage('Base price must be a positive number'),
          body('materials.*.material').notEmpty().withMessage('Material ID is required'),
          body('materials.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
          body('duration').optional().isFloat({ min: 0 }),
          body('hourlyRate').optional().isFloat({ min: 0 }),
          body('discountRate').optional().isFloat({ min: 0, max: 100 })
        ];
      }
    }
  };

exports.createService = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const service = new Service(req.body);
    try {
        await service.save();
        res.status(201).send(service);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('materials.material');
        res.send(services);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('materials.material');
        if (!service) {
            return res.status(404).send();
        }
        res.send(service);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateService = async (req, res) => {
    const validations = exports.validate('updateService');
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!service) {
            return res.status(404).send();
        }
        res.send(service);
    } catch (error) {
        res.status(400).send(error);
    }
};
