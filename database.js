const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables from .env file

// Ensure the database URL is properly loaded
if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL is not defined in environment variables.');
  process.exit(1);  // Exit process with an error code
}

// Log database URL to verify it's loaded correctly (avoid logging in production)
console.log('Connecting to database:', process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',  // Specify database dialect
  logging: false,       // Set to `console.log` to enable query logging during debugging
  define: {
    freezeTableName: true,  // Prevent Sequelize from pluralizing table names
    timestamps: false,      // Disable automatic timestamp fields (createdAt, updatedAt)
  },
  pool: {
    max: 5,     // Maximum number of connections in pool
    min: 0,     // Minimum number of connections in pool
    acquire: 30000,  // Maximum time (ms) to try getting a connection before throwing error
    idle: 10000,     // Maximum time (ms) a connection can be idle before being released
  }
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);  // Exit process if unable to connect
  });

module.exports = sequelize;
