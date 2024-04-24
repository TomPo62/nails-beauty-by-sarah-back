require('dotenv').config()
const serverless = require('serverless-http')
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')
const cookieParser = require('cookie-parser')

const servicesRoutes = require('./src/routes/servicesRoutes')
const materialsRoutes = require('./src/routes/materialsRoutes')
const clientsRoutes = require('./src/routes/clientsRoutes')
const appointmentsRoutes = require('./src/routes/appointmentsRoutes')

const uri = process.env.MONGO_URI
let cachedDb = null

const jwtToken = process.env.JWT_SECRET

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(helmet())
app.use(cors({ credentials: true, origin: true }))
app.use(cookieParser())

app.use(
  expressjwt({
    secret: jwtToken,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.token,
  }).unless({ path: ['/api/login', '/api/logout'] })
)

app.post('/api/login', (req, res) => {
  const { username, pwd } = req.body
  if (
    (username === process.env.USER_ONE && pwd === process.env.PWD_USER_ONE) ||
    (username === process.env.USER_TWO && pwd === process.env.PWD_USER_TWO)
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.cookie('token', token, { httpOnly: true, secure: true })
    res.status(200).send({ message: 'Logged in successfully!', token })
  } else {
    res.status(401).send('Unauthorized')
  }
})

app.get('/api/logout', (req, res) => {
  res.clearCookie('token')
  res.send({ message: 'Logged out successfully!' })
})

async function connectToDb() {
  if (cachedDb) {
    console.log('Using cached database connection.')
    return cachedDb
  }
  console.log('Creating new database connection...')
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  cachedDb = db
  console.log('Database connected successfully.')
  return db
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    await connectToDb()
    app.use('/api/materials', materialsRoutes)
    app.use('/api/services', servicesRoutes)
    app.use('/api/clients', clientsRoutes)
    app.use('/api/appointments', appointmentsRoutes)
    return serverless(app)(event, context)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    return { statusCode: 500, body: 'Internal Server Error' }
  }
}

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`)
// })

module.exports = serverless(app)
