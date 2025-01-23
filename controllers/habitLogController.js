const { HabitLog } = require('../models');

// Log habit completion
exports.logHabitCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;  // Ensure we get user_id from request body

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Create a new log entry
    const newLog = await HabitLog.create({
      habit_id: id,  // Assuming the habit ID is passed in params
      user_id,
      log_date: new Date(),
      is_completed: true,
      completed_at: new Date(),
    });

    res.status(201).json({
      message: 'Habit completion logged successfully',
      log: newLog,
    });
  } catch (error) {
    console.error('Error logging habit completion:', error);
    res.status(500).json({ error: 'Failed to log habit completion' });
  }
};

// Get habit logs by habit ID
exports.getHabitLogs = async (req, res) => {
  try {
    const { id } = req.params;

    const logs = await HabitLog.findAll({
      where: { habit_id: id },
      order: [['log_date', 'DESC']],  // Order by most recent log first
    });

    if (!logs.length) {
      return res.status(404).json({ message: 'No logs found for this habit' });
    }

    res.status(200).json(logs);
  } catch (error) {
    console.error('Error retrieving habit logs:', error);
    res.status(500).json({ error: 'Failed to retrieve habit logs' });
  }
};
