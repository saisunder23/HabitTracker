// models/teamMember.js file 

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

if (!sequelize || typeof sequelize.define !== 'function') {
  throw new Error('Sequelize instance not found or not initialized correctly.');
}


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
