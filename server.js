require('dotenv').config(); // Load .env first
const express = require('express');
const pool = require('./db'); // Import PostgreSQL connection

const app = express();
app.use(express.json()); // To handle JSON request bodies

app.get('/', (req, res) => {
  res.send("Welcome, your server is successfully running!");
});

// Example: Fetch all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
    console.log('users is active')
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log('✅ Server running on port 3000');
});
