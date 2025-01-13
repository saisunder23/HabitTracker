const { DataTypes } = require('sequelize');
const sequelize = require('../index'); // Path to the root index.js file

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
    type: DataTypes.TEXT,
  },
  goal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  point_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'habits',
  timestamps: false,
});

module.exports = Habit;
