const express = require('express')
const { validateClient } = require('../validation/clientsValidate')
const clientsController = require('../controllers/clientsController')
const router = express.Router()

router.post('/', validateClient('create'), clientsController.createClient)
router.put('/:id', validateClient('update'), clientsController.updateClient)
router.get('/recent-clients', clientsController.getRecentClients)

router.get('/', clientsController.getAllClients)
router.get('/:id', clientsController.getClientById)

module.exports = router
