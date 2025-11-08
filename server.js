require('dotenv').config(); // Load environment variables first
const express = require('express');
const sequelize = require('./src/config/database');
sequelize.sync({ alter: false, force: false });


const userRoutes = require('./src/routes/userRoutes');
const roundRoutes = require('./src/routes/roundRoutes')
const betRoutes = require('./src/routes/betsRoutes')
const accountRoutes= require('./src/routes/accountsRoutes')
const transactionRoutes = require('./src/routes/transactionsRoutes')

require('./src/model/association');

const app = express();
app.use(express.json()); // Parse JSON request bodies

// ✅ Default route
app.get('/', (req, res) => {
  res.send("Welcome, your server is successfully running!");
});

// ✅ Use your user routes
app.use('/users', userRoutes);

app.use('/rounds', roundRoutes);

app.use('/bets' , betRoutes);

app.use('/accounts', accountRoutes);

app.use('/transactions', transactionRoutes)

// ✅ Connect to the database and start the server

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully.');
    return sequelize.sync({ alter: true }); // Sync models with DB
  })
  .then(() => {
    console.log('✅ Database synced with associations');
    app.listen(3000, () => {
      console.log('🚀 Server running on port 3000');
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });
