const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

// Route to create a new habit
router.post('/', habitController.createHabit); // Create

// Route to get all habits
router.get('/', habitController.getAllHabits); // Read all

// Route to get a habit by its ID
router.get('/:id', habitController.getHabitById); // Read one

// Route to update a habit's details
router.put('/:id', habitController.updateHabit); // Update

// Route to delete a habit by its ID
router.delete('/:id', habitController.deleteHabit); // Delete

module.exports = router;
