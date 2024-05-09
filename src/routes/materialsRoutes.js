const express = require('express')
const router = express.Router()
const {validateMaterialCreation, validateMaterialUpdate } = require('../validation/materialsValidate')
const materialsController = require('../controllers/materialsController')

router.post(
  '/',
  validateMaterialCreation,
  materialsController.createMaterial
)
router.put(
  '/:id',
 validateMaterialUpdate,
  materialsController.updateMaterial
)

router.delete('/:id', materialsController.deleteMaterial)

router.get('/', materialsController.getAllMaterials)
router.get('/:id', materialsController.getMaterialById)


module.exports = router
