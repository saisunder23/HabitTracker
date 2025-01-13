'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('team_members', [
      {
        team_id: 1, // Team Alpha
        user_id: 1, // Alice
        created_at: new Date(),
      },
      {
        team_id: 1, // Team Alpha
        user_id: 2, // Bob
        created_at: new Date(),
      },
      {
        team_id: 2, // Team Beta
        user_id: 2, // Bob
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('team_members', null, {});
  },
};
