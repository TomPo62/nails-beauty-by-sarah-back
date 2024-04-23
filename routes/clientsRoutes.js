const express = require('express');
const clientsController = require('../controllers/clientsController');
const router = express.Router();

router.post('/', clientsController.createClient);
router.get('/', clientsController.getAllClients);

module.exports = router;
