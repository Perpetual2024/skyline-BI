const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bet = sequelize.define('Bet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  round_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  auto_cashout: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  cashout_multiplier: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  win_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  cashed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'bets',
  timestamps: true, 
});

module.exports = Bet;
