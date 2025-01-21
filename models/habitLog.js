// models/habitLog.js file 

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

if (!sequelize || typeof sequelize.define !== 'function') {
  throw new Error('Sequelize instance not found or not initialized correctly.');
}


const HabitLog = sequelize.define('HabitLog', {
  log_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_habit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  log_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('completed', 'incomplete'),
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
  },
  rating: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
  },
  points_earned: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'habits_log',
  timestamps: false,
});

module.exports = HabitLog;
