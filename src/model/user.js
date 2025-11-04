const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING, // ✅ correct
    unique: true,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING, // ✅ correct
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING, // ✅ email is just a string in Sequelize
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true, // ✅ built-in email validator
    },
  },
  password: {
    type: DataTypes.STRING, // ✅ correct
    allowNull: false,
  },
}, {
  timestamps: true, // ✅ automatically adds createdAt & updatedAt
  tableName: 'users', // optional: make sure it matches your DB table
});

module.exports = User;
