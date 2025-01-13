const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const TeamHabit = sequelize.define('TeamHabit', {
  team_habit_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  habit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'team_habits',
  timestamps: false,
});

module.exports = TeamHabit;
