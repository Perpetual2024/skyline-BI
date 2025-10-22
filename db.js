// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

// Create a new connection pool using .env values
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Optional: test the connection when app starts
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool; // Export so other files (like server.js) can use it
