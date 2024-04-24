require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectToDb = require('./config/db')
const getJwtMiddleware = require('./middleware/authMiddleware')
const authRoutes = require('./routes/authRoutes')
const materialsRoutes = require('./routes/materialsRoutes')
const servicesRoutes = require('./routes/servicesRoutes')
const clientsRoutes = require('./routes/clientsRoutes')
const appointmentsRoutes = require('./routes/appointmentsRoutes')

const jwtSecret = process.env.JWT_SECRET
const dbUri = process.env.MONGO_URI

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors({ credentials: true, origin: true }))
app.use(cookieParser())
app.use(getJwtMiddleware(jwtSecret))

app.use('/api', authRoutes)
app.use('/api/materials', materialsRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/clients', clientsRoutes)
app.use('/api/appointments', appointmentsRoutes)

// Connect to DB and initialize routes only once at startup
connectToDb(dbUri).catch((err) => {
  console.err('Failed to connect to MongoDB:', err)
  process.exit(1)
})

module.exports = app
