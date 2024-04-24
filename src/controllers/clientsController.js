const Client = require('../models/client')

exports.createClient = async (req, res) => {
  const client = new Client(req.body)
  try {
    await client.save()
    res.status(201).send(client)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find()
    res.send(clients)
  } catch (err) {
    res.status(500).send(err)
  }
}
