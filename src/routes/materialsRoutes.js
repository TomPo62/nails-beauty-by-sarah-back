const express = require('express')
const router = express.Router()
const materialsController = require('../controllers/materialsController')

router.post(
  '/',
  materialsController.validate('createMaterial'),
  materialsController.createMaterial
)
router.get('/', materialsController.getAllMaterials)

router.put(
  '/:id',
  materialsController.validate('updateMaterial'),
  materialsController.updateMaterial
)

module.exports = router
