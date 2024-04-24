require('dotenv').config()
const express = require('express')
// const cookieParser = require('cookie-parser')
const connectToDb = require('./config/db')
const getJwtMiddleware = require('./middleware/authMiddleware')
const authRoutes = require('./routes/authRoutes')
const materialsRoutes = require('./routes/materialsRoutes')
const servicesRoutes = require('./routes/servicesRoutes')
const clientsRoutes = require('./routes/clientsRoutes')
const appointmentsRoutes = require('./routes/appointmentsRoutes')

const jwtSecret = process.env.JWT_SECRET

const app = express()
app.use(express.json())
// Connect to DB and initialize routes only once at startup
connectToDb()

// app.use(cookieParser())
// app.use(getJwtMiddleware(jwtSecret))

// app.use('/api', authRoutes)
app.use('/api/materials', materialsRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/clients', clientsRoutes)
app.use('/api/appointments', appointmentsRoutes)



if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server ecoute sur le port ${PORT}`)
  })
}

module.exports = app
