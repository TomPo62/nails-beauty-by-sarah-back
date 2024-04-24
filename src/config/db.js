const mongoose = require('mongoose');

global.cachedDb = global.cachedDb || null;  // Utilisez une variable globale pour stocker la connexion

async function connectToDb(uri) {
  if (global.cachedDb) {
    console.log('Using cached database connection.');
    return global.cachedDb;  // Retourne la connexion mise en cache
  }

  console.log('Creating new database connection...');
  const db = await mongoose.connect(uri, {
    bufferCommands: false,
  });

  global.cachedDb = db;
  console.log('Database connected successfully.');
  return db;
}

module.exports = connectToDb;
