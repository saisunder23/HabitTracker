const express = require('express');
const sequelize = require('./database');  // Import Sequelize instance
const habitsRoutes = require('./routes/habits'); 

const app = express();
app.use(express.json());

// Sync database (if needed)
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error syncing database:', err));

app.use('/habits', habitsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
