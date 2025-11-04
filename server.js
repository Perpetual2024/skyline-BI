require('dotenv').config(); // Load environment variables first
const express = require('express');
const sequelize = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(express.json()); // Parse JSON request bodies

// ✅ Default route
app.get('/', (req, res) => {
  res.send("Welcome, your server is successfully running!");
});

// ✅ Use your user routes
app.use('/users', userRoutes);

// ✅ Connect to the database and start the server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully.');
    return sequelize.sync(); // Sync models with DB (optional)
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('🚀 Server running on port 3000');
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });
