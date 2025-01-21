// models/user.js file 


const { DataTypes } = require('sequelize');
const sequelize = require('../database');

if (!sequelize || typeof sequelize.define !== 'function') {
  throw new Error('Sequelize instance not found or not initialized correctly.');
}

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // this is equivalent to SERIAL in PostgreSQL
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users', // Map to the `users` table in PostgreSQL
  timestamps: false,  // Disable Sequelize's auto-timestamping
});

module.exports = User;
