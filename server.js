
require('dotenv').config(); // Load .env first
const express = require('express');
const pool = require('./db'); // Import PostgreSQL connection
const bcrypt = require('bcrypt');
const { validateCreateUser, validateUpdateUser, validateUserId } = require('./src/middleware/validation');


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

// Get user by ID
app.get('/users/:id',validateUserId, async (req, res) => {
  const { id } = req.params; // extract the id from the URL

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/users',validateCreateUser, async (req, res) => {
    const { username, phone, email, password } = req.body;
    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, phone, email, password ) VALUES ($1, $2, $3, $4) RETURNING *', [username, phone, email, hashedPassword], 
        );
        res.status(201).json(result.rows[0])
    }catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error'})
    }
})

app.patch('/users/:id', validateUpdateUser, async (req, res) => {
  const { id } = req.params;
  const { username, phone, email, password } = req.body;

  try {
    // Hash password if it's being updated
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await pool.query(
      `UPDATE users 
       SET username = COALESCE($1, username),
           phone = COALESCE($2, phone),
           email = COALESCE($3, email),
           password = COALESCE($4, password),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING id, username, phone, email, updated_at`,
      [username, phone, email, hashedPassword, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/users/:id',validateUserId, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(3000, () => {
  console.log('✅ Server running on port 3000');
});
