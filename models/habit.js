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
}, {
  tableName: 'habits',
  timestamps: false,
});

module.exports = Habit;
