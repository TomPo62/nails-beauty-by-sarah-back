const express = require('express')
const router = express.Router()
const {validateMaterialCreation, validateMaterialUpdate } = require('../validation/materialsValidate')
const materialsController = require('../controllers/materialsController')

router.post(
  '/',
  validateMaterialCreation,
  materialsController.createMaterial
)

router.delete('/:id', materialsController.deleteMaterial)


router.put(
  '/:id',
 validateMaterialUpdate,
  materialsController.updateMaterial
)



router.get('/', materialsController.getAllMaterials)
router.get('/:id', materialsController.getMaterialById)


module.exports = router
