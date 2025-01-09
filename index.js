
require('dotenv').config();
// Verify environment is loading 
console.log('Database URL:', process.env.DATABASE_URL);


const { Sequelize } = require('sequelize');

// Initialize Sequelize with connection string
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Optional: can set to true to debug SQL queries
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Unable to connect to the database:', err));
