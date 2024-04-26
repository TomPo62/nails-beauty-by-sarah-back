require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const connectToDb = require('./config/db')
const cookieParser = require('cookie-parser')
const getJwtMiddleware = require('./middleware/authMiddleware')
const authRoutes = require('./routes/authRoutes')
const materialsRoutes = require('./routes/materialsRoutes')
const servicesRoutes = require('./routes/servicesRoutes')
const clientsRoutes = require('./routes/clientsRoutes')
const appointmentsRoutes = require('./routes/appointmentsRoutes')
const jwtSecret = process.env.JWT_SECRET
const cors = require('cors')
const helmet = require('helmet')
const app = express()

app.use(helmet())

app.use(cors())

app.use(bodyParser.json())
connectToDb()

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: 'Something broke!' })
  next()
})

app.use(cookieParser())
app.use(getJwtMiddleware(jwtSecret))
app.use(helmet)
app.use('/api', authRoutes)
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
