const express = require('express');
const cors = require('cors');
const sequelize = require('./database');  // Import Sequelize instance
const habitsRoutes = require('./routes/habits');
const userRoutes = require('./routes/users');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all requests (moved here after JSON parsing)
app.use(cors());


// Define API routes for handling habits and users
app.use('/habits', habitsRoutes);
app.use('/users', userRoutes);  // Add authentication routes

// Sync database (without force to prevent data loss)
sequelize.sync({ alter: true })  // Use alter instead of force: true
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error syncing database:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Global error handler to catch unexpected issues
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
