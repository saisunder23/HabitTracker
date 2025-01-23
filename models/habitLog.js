const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Habit = require('./habit');  // Import the Habit model
const User = require('./user');    // Assuming a User model exists

const HabitLog = sequelize.define('HabitLog', {
  log_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  habit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Habit,
      key: 'habit_id',
    },
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
    onDelete: 'CASCADE',
  },
  log_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Default to false
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true,  // Nullable until habit is completed
  },
}, {
  tableName: 'habit_logs',
  timestamps: false,
});

module.exports = HabitLog;
