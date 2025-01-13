const { User, Habit } = require('./models'); // Import models from models/index.js

(async () => {
  try {
    
    // Test creating a user
    const newUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password_hash: 'hashedpassword123',
    });
    console.log('New User:', newUser.toJSON());

    // Test fetching all users
    const users = await User.findAll();
    console.log('All Users:', users.map(user => user.toJSON()));

    // Test creating a habit
    const newHabit = await Habit.create({
      habit_name: 'Drink Water',
      description: 'Drink 8 glasses of water daily.',
      goal: 8,
      point_value: 10,
    });
    console.log('New Habit:', newHabit.toJSON());

    // Fetch a specific user
    const fetchedUser = await User.findByPk(newUser.user_id);
    console.log('Fetched User:', fetchedUser?.toJSON());

    // Filter users
    const filteredUsers = await User.findAll({ where: { username: 'testuser' } });
    console.log('Filtered Users:', filteredUsers.map(user => user.toJSON()));
  } catch (err) {
    console.error('Error:', err.message || err);
  }
})();
