const { Habit } = require('../models');

// Create a new habit
exports.createHabit = async (req, res) => {
  try {
    const { habit_name, description, goal, point_value } = req.body;

    // Validate required fields
    if (!habit_name || goal == null || point_value == null) {
      return res.status(400).json({ error: 'Please provide habit_name, goal, and point_value' });
    }

    // Check if habit already exists
    const existingHabit = await Habit.findOne({ where: { habit_name } });
    if (existingHabit) {
      return res.status(400).json({ error: 'Habit already exists' });
    }

    // Create a new habit
    const newHabit = await Habit.create({
      habit_name,
      description: description || '', // Default empty string if not provided
      goal,
      point_value,
    });

    res.status(201).json(newHabit);
  } catch (error) {
    console.error('Error creating habit:', error);
    res.status(500).json({ error: 'Failed to create habit' });
  }
};

// Get all habits
exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.findAll();
    res.status(200).json(habits);
  } catch (error) {
    console.error('Error retrieving habits:', error);
    res.status(500).json({ error: 'Failed to retrieve habits' });
  }
};

// Get a habit by its ID
exports.getHabitById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Habit ID is required' });
    }

    const habit = await Habit.findByPk(id);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    res.status(200).json(habit);
  } catch (error) {
    console.error('Error retrieving habit by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve habit' });
  }
};

// Update a habit by ID
exports.updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { habit_name, description, goal, point_value } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Habit ID is required' });
    }

    const habit = await Habit.findByPk(id);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    // Update the habit
    await habit.update({
      habit_name: habit_name || habit.habit_name,
      description: description || habit.description,
      goal: goal ?? habit.goal,  // Nullish coalescing to allow 0 values
      point_value: point_value ?? habit.point_value,
    });

    res.status(200).json(habit);
  } catch (error) {
    console.error('Error updating habit:', error);
    res.status(500).json({ error: 'Failed to update habit' });
  }
};

// Delete a habit by ID
exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Habit ID is required' });
    }

    const habit = await Habit.findByPk(id);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    await habit.destroy();
    res.status(200).json({ message: `Habit with ID ${id} deleted successfully` });
  } catch (error) {
    console.error(`Error deleting habit ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to delete habit' });
  }
};

// Mark a habit as completed
exports.markHabitAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findByPk(id);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    await habit.update({
      is_completed: true,
      completed_at: new Date(), // Set completion date to current timestamp
    });

    res.status(200).json(habit);
  } catch (error) {
    console.error('Error marking habit as completed:', error);
    res.status(500).json({ error: 'Failed to mark habit as completed' });
  }
};
