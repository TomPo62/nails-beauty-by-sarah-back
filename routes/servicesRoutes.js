const express = require('express')
const servicesController = require('../controllers/servicesController')
const router = express.Router()

router.post(
  '/',
  servicesController.validate('createService'),
  servicesController.createService
)
router.get('/', servicesController.getAllServices)
router.get('/:id', servicesController.getService)
router.put(
  '/:id',
  servicesController.validate('updateService'),
  servicesController.updateService
)

module.exports = router
