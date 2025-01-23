const { DataTypes } = require('sequelize');
const sequelize = require('../database');

if (!sequelize) {
  console.error("Sequelize instance is undefined.");
}

const Habit = sequelize.define('Habit', {
  habit_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  habit_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  goal: {
    type: DataTypes.INTEGER,
  },
  point_value: {
    type: DataTypes.INTEGER,
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  // Default to false
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true,  // Completion timestamp
  },
}, {
  tableName: 'habits',
  timestamps: false,
});

module.exports = Habit;
