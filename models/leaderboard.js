const { DataTypes } = require('sequelize');
const sequelize = require('../index');

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
