'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('habits_log', [
      {
        team_habit_id: 1, // Team Alpha - Exercise
        user_id: 1, // Alice
        log_date: new Date(),
        status: 'completed',
        comment: 'Great workout!',
        rating: 'easy',
        points_earned: 5,
        created_at: new Date(),
      },
      {
        team_habit_id: 2, // Team Beta - Read a Book
        user_id: 2, // Bob
        log_date: new Date(),
        status: 'incomplete',
        comment: 'Missed it today.',
        rating: null,
        points_earned: 0,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('habits_log', null, {});
  },
};
