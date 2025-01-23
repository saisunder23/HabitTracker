const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const habitLogController = require('../controllers/habitLogController');
const Habit = require('../models/habit');
const authMiddleware = require('../middleware/authMiddleware');

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

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, points } = req.body;
        const newHabit = await Habit.create({ name, points, user_id: req.user.id });
        res.status(201).json(newHabit);
    } catch (error) {
        res.status(400).json({ error: 'Error adding habit' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const habits = await Habit.findAll({ where: { user_id: req.user.id } });
        res.status(200).json(habits);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching habits' });
    }
});

module.exports = router;
