const Stock = require('../models/stock')

exports.updateStock = async (req, res)=>{
  const {materialId, quantity, minimumRequired}= req.body

  try {
    const updatedStock = await Stock.findOneAndUpdate(
      {material: materialId},
      {
        quantity: quantity,
        minimumRequired: minimumRequired,
        lastUpdated: Date.now()
      }
    )
    if(!updatedStock){
      return res.status(404).json({message: 'Stock not found'})
    }
    res.status(200).json(updatedStock)
  } catch (err) {
    res.status(500).json({message: 'Error updating stock', err})
  }
}

exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate('material')
    res.statud(200).json(stocks)
  } catch (err) {
    res.status(500).json({message: 'Error fetching stocks', err})
  }
}
