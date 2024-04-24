const mongoose = require('mongoose')
let connection = null

async function connectToDb() {
  if (connection && mongoose.connection.readyState === 1) {
    console.log('Using existing database connection')
    return connection
  }

  if (connection && mongoose.connection.readyState !== 1) {
    console.log('Database connection is not ready, reconnecting...')
    await mongoose.disconnect() // Assurer que la connexion est fermée proprement
    connection = null // Réinitialiser la connexion
  }

  console.log('Creating new database connection...')
  try {
    connection = await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected successfully.')
    return connection
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error // Propager l'erreur pour arrêter l'application si nécessaire
  }
}

module.exports = connectToDb
