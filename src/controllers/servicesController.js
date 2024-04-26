const Service = require('../models/service')

const { validationResult } = require('express-validator')

exports.createService = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const service = new Service(req.body)
  try {
    await service.save()
    res.status(201).send(service)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.getAllServices = async (req, res) => {
  const { page = 1, limit = 10, name, minPrice, maxPrice } = req.query

  const options = {
    page,
    limit,
    populate: 'materials.material',
    sort: { name: 1 },
  }

  const query = {}
  if (name) query.name = { $regex: name, $options: 'i' }
  if (minPrice)
    query.basePrice = { ...query.basePrice, $gte: parseFloat(minPrice) }
  if (maxPrice)
    query.basePrice = { ...query.basePrice, $lte: parseFloat(maxPrice) }

  try {
    const result = await Service.paginate(query, options)
    res.json(result)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving services', error: err.message })
  }
}

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      'materials.material'
    )
    if (!service) {
      return res.status(404).send()
    }
    res.send(service)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateService = async (req, res) => {
  const validations = exports.validate('updateService')
  await Promise.all(validations.map((validation) => validation.run(req)))

  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    return res.status(400).json({ errs: errs.array() })
  }
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!service) {
      return res.status(404).send()
    }
    res.send(service)
  } catch (err) {
    res.status(400).send(err)
  }
}
