const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const auth = require('./middleware/auth');

// Protect dashboard route
app.get('/api/dashboard', auth, (req, res) => {
  res.json({ message: 'Welcome to the dashboard, you are authenticated!' });
});

// Database connection
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Driver Behavior Monitoring API');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

