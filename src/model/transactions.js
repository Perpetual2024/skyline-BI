const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  account_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  round_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50), // e.g. 'deposit', 'bet', 'payout'
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'transactions',
  timestamps: true, // Adds createdAt and updatedAt automatically
});

module.exports = Transaction;
