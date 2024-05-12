const Client = require('../models/client')
const { validationResult } = require('express-validator')

exports.createClient = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const client = new Client(req.body)
  try {
    await client.save()
    res.status(201).send(client)
  } catch (err) {
    res.status(400).json({
      message: 'Error creating client',
      errors: err.message || err,
    })
  }
}

// Mise à jour d'un client existant
exports.updateClient = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(400).json({ errors: errors.array() })
  }
  const clientId = req.params.id
  const updateData = req.body

  try {
    let client = await Client.findByIdAndUpdate(clientId, updateData, {
      new: true,
      runValidators: true,
    })
    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }

    client = await Client.findById(client._id).populate({
      path: 'history',
      populate: {
        path: 'service',
        populate: { path: 'materials.material' },
      },
    })
    res.status(200).json(client)
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error updating client', errors: err.message || err })
  }
}

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id)
    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }
    res.status(200).json({ message: 'Client deleted successfully' })
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting client',
      error: err.message,
    })
  }
}

exports.getTopClients = async (req, res) => {
  try {
    const topClients = await Client.aggregate([
      {
        $lookup: {
          from: 'appointments',
          localField: 'history',
          foreignField: '_id',
          as: 'appointmentsDetails',
        },
      },
      {
        $addFields: {
          pastAppointmentsCount: {
            $size: {
              $filter: {
                input: '$appointmentsDetails',
                as: 'appointment',
                cond: { $lt: ['$$appointment.date', new Date()] },
              },
            },
          },
        },
      },
      { $sort: { pastAppointmentsCount: -1 } },
      { $limit: 3 },
    ])

    res.json(topClients)
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving top clients',
      error: err.message,
    })
  }
}

exports.getAllClients = async (req, res) => {
  const { page = 1, limit = 10, name, nearestDate } = req.query
  const options = {
    page,
    limit,
    populate: {
      path: 'history',
      match: nearestDate ? { date: { $gte: new Date(nearestDate) } } : {},
      populate: { path: 'service' },
    },
  }

  const query = {}
  if (name) query.name = { $regex: name, $options: 'i' }

  try {
    const result = await Client.paginate(query, options)
    res.json(result)
  } catch (err) {
    res.status(500).send({
      message: 'Error retrieving clients',
      error: err.message,
    })
  }
}

exports.getRecentClients = async (req, res) => {
  console.log('Fetching recent clients...')
  const { daysPast = 7 } = req.query
  const dateLimit = new Date(Date.now() - daysPast * 24 * 60 * 60 * 1000)
  console.log(`Date limit set to: ${dateLimit}`)

  try {
    const recentClients = await Client.find({ createdAt: { $gte: dateLimit } })
    console.log(`Found ${recentClients.length} clients`)

    if (recentClients.length === 0) {
      return res.status(404).json({
        message: 'No recent clients found within the specified time frame.',
      })
    }
    res.status(200).json(recentClients)
  } catch (err) {
    console.error('Error fetching recent clients:', err)
    res.status(500).json({
      message: 'Error retrieving recent clients',
      error: err.message,
    })
  }
}

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('history')
    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }
    res.json(client)
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving client',
      error: err.message,
    })
  }
}
