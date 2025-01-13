'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('team_habits', [
      {
        team_id: 1, // Team Alpha
        habit_id: 1, // Exercise
        created_at: new Date(),
      },
      {
        team_id: 2, // Team Beta
        habit_id: 2, // Read a Book
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('team_habits', null, {});
  },
};
