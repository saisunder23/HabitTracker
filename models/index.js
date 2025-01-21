const Sequelize = require('sequelize');
const sequelize = require('../database');

const models = {};

// Import models dynamically
models.User = require('./user');
models.Team = require('./team');
models.TeamMember = require('./teamMember');
models.Habit = require('./habit');
models.TeamHabit = require('./teamHabit');
models.HabitLog = require('./habitLog');
models.Leaderboard = require('./leaderboard');

// Set up model associations if needed
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
