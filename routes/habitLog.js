const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const habitLogController = require('../controllers/habitLogController');

router.post('/', habitLogController.createHabitLog);
router.get('/', habitLogController.getWeeklyLogs); // Fetch logs for a week
router.put('/:id', habitLogController.updateHabitLog); // Update log (e.g., add notes)
router.delete('/:id', habitLogController.deleteHabitLog);

module.exports = router;
