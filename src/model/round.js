const { DataTypes, UUID } = require('sequelize');
const sequelize = require('../config/database');

const Round = sequelize.define('Round', {
  id: {
    type: UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  crash_point: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  server_seed: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  client_seed: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  total_bets: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  total_payout: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'rounds',     // 👈 ensure it maps to your table name exactly
  timestamps: false        // 👈 disables createdAt and updatedAt
});



module.exports = Round;
