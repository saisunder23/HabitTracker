const User = require('./user');
const Team = require('./team');
const TeamMember = require('./teamMember');
const Habit = require('./habit');
const TeamHabit = require('./teamHabit');
const HabitLog = require('./habitLog');
const Leaderboard = require('./leaderboard');


// Exporting all models for easy import
module.exports = {
  User,
  Team,
  TeamMember,
  Habit,
  TeamHabit,
  HabitLog,
  Leaderboard,
};
