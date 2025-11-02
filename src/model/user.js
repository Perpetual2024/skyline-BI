const { DataTypes, UUID } = require('sequelize')
const sequelize = require('../config/database')
s
const User = sequelize.define('User', {
    id: {
        type: UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: String,
        unique: true,
        allowNull: false
    },
    phone: {
        type: String,
        unique: true,
        allowNull: false,
    },
    email: {
        type: email,
        unique: true,
        allowNull: false
    },
    password: {
        type: String,
        allowNull: false
    }
})

module.exports = User

