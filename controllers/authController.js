const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');  // Ensure correct import

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for:', username);

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
        console.log('User not found in database');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Stored hash in DB:', user.password_hash);
    console.log('Entered password:', password);


    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }

console.log('Entered password:', password);
console.log('Stored hash:', user.password_hash);

};
