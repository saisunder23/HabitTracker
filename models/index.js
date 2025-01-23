const Sequelize = require('sequelize');
const sequelize = require('../database');

const models = {};

// Import models dynamically
models.User = require('./users');
models.Team = require('./team');
models.TeamMember = require('./teamMember');
models.Habit = require('./habit');
models.TeamHabit = require('./teamHabit');
models.HabitLog = require('./habitLog');
models.Leaderboard = require('./leaderboard');

// Set up relationships between models
models.Habit.hasMany(models.HabitLog, { foreignKey: 'habit_id', onDelete: 'CASCADE' });
models.HabitLog.belongsTo(models.Habit, { foreignKey: 'habit_id' });

models.User.hasMany(models.HabitLog, { foreignKey: 'user_id', onDelete: 'CASCADE' });
models.HabitLog.belongsTo(models.User, { foreignKey: 'user_id' });

// Add relationship between users and teams (if applicable)
models.User.belongsToMany(models.Team, { through: models.TeamMember, foreignKey: 'user_id' });
models.Team.belongsToMany(models.User, { through: models.TeamMember, foreignKey: 'team_id' });

// Dynamic associations if needed
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Ensure tables exist and sync them with the database
// Ensure tables exist and sync them with the database
sequelize.sync({ alter: true })
  .then(() => console.log('Database & tables synced successfully'))
  .catch((err) => console.error('Error syncing database:', err));



models.sequelize = sequelize;
models.Sequelize = Sequelize;

// Helper function to authenticate a user
models.authenticateUser = async (username, password) => {
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const user = await models.User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  } catch (error) {
    throw error;
  }
};

module.exports = models;
