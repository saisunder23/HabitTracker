
// models/leaderboard.js file 

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

if (!sequelize || typeof sequelize.define !== 'function') {
  throw new Error('Sequelize instance not found or not initialized correctly.');
}


const Leaderboard = sequelize.define('Leaderboard', {
  leaderboard_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'leaderboard',
  timestamps: false,
});

module.exports = Leaderboard;
