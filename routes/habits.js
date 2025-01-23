const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const habitLogController = require('../controllers/habitLogController');

// Habit routes
router.post('/', habitController.createHabit);
router.get('/', habitController.getAllHabits);
router.get('/:id', habitController.getHabitById);
router.put('/:id', habitController.updateHabit);
router.delete('/:id', habitController.deleteHabit);
router.put('/:id/complete', habitController.markHabitAsCompleted);

// Habit log routes
router.post('/:id/log', habitLogController.logHabitCompletion);
router.get('/:id/logs', habitLogController.getHabitLogs);

module.exports = router;
