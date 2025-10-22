
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

app.post('/users', async (req, res) => {
    const { username, phone, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (username, phone, email, password ) VALUES ($1, $2, $3, $4) RETURNING *', [username, phone, email, password], 
        );
        res.status(201).json(result.rows[0])
    }catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error'})
    }
})

app.listen(3000, () => {
  console.log('✅ Server running on port 3000');
});
