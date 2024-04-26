const express = require('express')
const servicesController = require('../controllers/servicesController')
const {validateServiceCreation, validateServiceUpdate} = require('../validation/servicesValidate')
const router = express.Router()

router.post(
  '/',
  validateServiceCreation,
  servicesController.createService
)

router.put(
  '/:id',
  validateServiceUpdate,
  servicesController.updateService
)

router.get('/', servicesController.getAllServices)
router.get('/:id', servicesController.getServiceById)


module.exports = router
