const express = require('express')
const {validateClient} = require('../validation/clientsValidate')
const clientsController = require('../controllers/clientsController')
const router = express.Router()

router.post(
  '/',
  validateClient('create'),
  clientsController.createClient
)
router.put('/:id', validateClient('update'), clientsController.updateClient);


router.get('/', clientsController.getAllClients)
router.get('/:id', clientsController.getClientById)
router.get('/recent-clients', clientsController.getRecentClients)


module.exports = router
