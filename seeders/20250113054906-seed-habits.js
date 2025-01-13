//  Seed Habits seed data 

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('habits', [
      {
        habit_name: 'Exercise',
        description: 'Do 30 minutes of exercise daily.',
        goal: 1,
        point_value: 5,
        created_at: new Date(),
      },
      {
        habit_name: 'Read a Book',
        description: 'Read 20 pages of a book daily.',
        goal: 1,
        point_value: 3,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('habits', null, {});
  },
};
