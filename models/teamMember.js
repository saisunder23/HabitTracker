const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const TeamMember = sequelize.define('TeamMember', {
  team_member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'team_members',
  timestamps: false,
});

module.exports = TeamMember;
