const Material = require('../models/material')
const Stock = require('../models/stock')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

exports.createMaterial = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const {
      name,
      costPerUnit,
      unit,
      description,
      category,
      supplier,
      initialStock,
      minimumRequired,
    } = req.body
    const material = new Material({
      name,
      costPerUnit,
      unit,
      description,
      category,
      supplier,
    })

    const savedMaterial = await material.save({ session })

    if (initialStock !== undefined) {
      const stock = new Stock({
        material: savedMaterial._id,
        quantity: initialStock,
        minimumRequired: minimumRequired
      })
      await stock.save({ session })
    }

    await session.commitTransaction()
    session.endSession()
    res.status(201).send(savedMaterial)
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    res.status(400).send(err)
  }
}

exports.getAllMaterials = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
    name,
    unit,
    description,
    minCost,
    maxCost,
  } = req.query

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { [sortBy]: order === 'asc' ? 1 : -1 },
    populate: ['stock'],
  }

  const filterOptions = {}
  if (name) filterOptions.name = new RegExp(name, 'i')
  if (unit) filterOptions.unit = unit
  if (description) filterOptions.description = new RegExp(description, 'i')
  if (minCost) filterOptions.costPerUnit = { $gte: parseFloat(minCost) }
  if (maxCost)
    filterOptions.costPerUnit = {
      ...filterOptions.costPerUnit,
      $lte: parseFloat(maxCost),
    }

  try {
    const result = await Material.paginate(filterOptions, options)
    res.status(200).json(result)
  } catch (err) {
    res
      .status(500)
      .send({ message: 'Error accessing the materials', error: err.message })
  }
}

exports.updateMaterial = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!material) {
      return res.status(404).send()
    }
    res.send(material)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate('stock')
    if (!material) {
      return res.status(404).send()
    }
    res.send(material)
  } catch (err) {
    res.status(400).send(err)
  }
}
