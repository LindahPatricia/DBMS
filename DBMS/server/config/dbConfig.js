const { Pool } = require('pg');
require('dotenv').config(); // Make sure to load environment variables

// Create a new pool instance with PostgreSQL connection parameters
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
});

// Test the database connection
pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error', err));

// Export the pool for use in other parts of the application
module.exports = pool;
