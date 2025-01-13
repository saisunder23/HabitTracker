'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('leaderboard', [
      {
        team_id: 1, // Team Alpha
        total_points: 50,
        created_at: new Date(),
      },
      {
        team_id: 2, // Team Beta
        total_points: 30,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('leaderboard', null, {});
  },
};
