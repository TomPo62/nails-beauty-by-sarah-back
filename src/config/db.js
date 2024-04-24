const mongoose = require('mongoose')

async function connectToDb() {
  console.log('Attempting to connect to database...')
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected successfully.')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

module.exports = connectToDb
