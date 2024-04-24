const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./config/db');
const getJwtMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const materialsRoutes = require('./routes/materialsRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const clientsRoutes = require('./routes/clientsRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(getJwtMiddleware(process.env.JWT_SECRET));

app.use('/api', authRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/appointments', appointmentsRoutes);

// Connect to DB and initialize routes only once at startup
connectToDb(process.env.MONGO_URI).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1);
});

module.exports = app;
