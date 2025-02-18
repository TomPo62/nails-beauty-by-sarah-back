require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const connectToDb = require('./config/db')
const getJwtMiddleware = require('./middleware/authMiddleware')
const jwtSecret = process.env.JWT_SECRET
const cors = require('cors')
const helmet = require('helmet')
const app = express()

app.use(helmet())

app.use(
  cors({
    origin: ['https://nails-beauty-by-sarah-front.vercel.app/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
     allowedHeaders: [
       'Content-Type',
       'Authorization',
       'X-Requested-With',
       'X-Auth-Token',
       'Origin',
       'Client-Security-Token',
       'Accept',
     ],
  })
)

app.use(bodyParser.json())
connectToDb()

app.use(getJwtMiddleware(jwtSecret))

const authRoutes = require('./routes/authRoutes')
const materialsRoutes = require('./routes/materialsRoutes')
const servicesRoutes = require('./routes/servicesRoutes')
const clientsRoutes = require('./routes/clientsRoutes')
const appointmentsRoutes = require('./routes/appointmentsRoutes')
const stocksRoutes = require('./routes/stocksRoutes')


app.use('/api', authRoutes)
app.use('/api/materials', materialsRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/clients', clientsRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/stocks', stocksRoutes)

app.get('/', (req, res)=>{
  res.status(200).send({message: 'API On!'})
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: 'Something broke!' })
  next()
})

if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

module.exports = app
