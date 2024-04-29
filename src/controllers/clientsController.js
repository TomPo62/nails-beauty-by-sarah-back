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
    return res.status(400).json({ errors: errors.array() })
  }

  const clientId = req.params.id
  const updateData = req.body

  try {
    const client = await Client.findById(clientId)
    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    }

    // Update contact details if provided
    if (updateData.contact) {
      // Approach: Merge each updated contact into existing contacts or add new
      const existingContacts = client.contact
      const updatedContacts = updateData.contact.map((updated) => {
        const existing = existingContacts.find(
          (ec) =>
            ec.email === updated.email || ec.numeroTel === updated.numeroTel
        )
        return existing ? { ...existing.toObject(), ...updated } : updated
      })

      // Assign the merged contacts back to the client object
      client.contact = updatedContacts
    }

    // Update other modifiable fields from updateData
    ;['name', 'preferences', 'history'].forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(updateData, field)) {
        client[field] = updateData[field]
      }
    })

    await client.save()
    res.status(200).json(client)
  } catch (err) {
    res.status(400).json({
      message: 'Error updating client',
      errors: err.message || err,
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
  const { daysPast = 7 } = req.query
  const dateLimit = new Date(Date.now() - daysPast * 24 * 60 * 60 * 1000)

  try {
    const recentClients = await Client.find({createdAt: {$gte: dateLimit}})
    res.status(200).json(recentClients)
  } catch (err) {
    res.status(500).json({
      message: 'Error retireving recent clients',
      error: err.message
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
