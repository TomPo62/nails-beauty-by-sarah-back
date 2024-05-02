const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const {validateStockUpdate} = require('../validation/stocksValidate')

router.patch('/update/:materialId',validateStockUpdate, stockController.updateStock);

router.get('/', stockController.getStocks);

module.exports = router;
