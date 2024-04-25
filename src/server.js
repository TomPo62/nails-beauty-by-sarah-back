require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const connectToDb = require('./config/db')

const materialsRoutes = require('./routes/materialsRoutes')
const servicesRoutes = require('./routes/servicesRoutes')
const clientsRoutes = require('./routes/clientsRoutes')
const appointmentsRoutes = require('./routes/appointmentsRoutes')

const app = express()

// Middleware pour parser le body des requêtes en JSON
app.use(bodyParser.json())
connectToDb()

app.get('/test', (req, res) => {
  res.status(200).send({ message: 'Test route successful' })
})


app.use('/api/materials', materialsRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/clients', clientsRoutes)
app.use('/api/appointments', appointmentsRoutes)

if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

module.exports = app
