const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING, 
    unique: true,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING, 
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING, 
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true, 
    },
  },
  password: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// ✅ Hash password if it's updated
User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

module.exports = User;
