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



router.get('/', materialsController.getAllMaterials)
router.get('/:id', materialsController.getMaterialById)


router.delete('/del/:id', materialsController.deleteMaterial)
module.exports = router
