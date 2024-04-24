const Client = require('../models/client');

exports.createClient = async (req, res) => {
  const client = new Client(req.body);
  try {
    await client.save();
    res.status(201).send(client);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.send(clients);
  } catch (error) {
    res.status(500).send(error);
  }
};
