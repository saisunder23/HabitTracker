require('dotenv').config(); // Load environment variables
const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable SQL query logs
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ force: true }); // Force true: Drops and recreates all tables
  })
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize; // Export Sequelize instance
