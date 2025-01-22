const express = require('express');
const cors = require('cors');
const sequelize = require('./database');  // Import Sequelize instance
const habitsRoutes = require('./routes/habits');

const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define API routes for handling habits
app.use('/habits', habitsRoutes);

// Sync database (if needed)
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error syncing database:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
