const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Team = sequelize.define('Team', {
  team_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group_type: {
    type: DataTypes.ENUM('partner', 'group'),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'teams',
  timestamps: false,
});

module.exports = Team;
