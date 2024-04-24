const mongoose = require('mongoose');
let cachedDb = null;

async function connectToDb(uri) {
  if (cachedDb) {
    console.log('Using cached database connection.');
    return cachedDb;
  }
  console.log('Creating new database connection...');
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = db;
  console.log('Database connected successfully.');
  return db;
}

module.exports = connectToDb;
