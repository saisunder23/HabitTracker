'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('teams', [
      {
        team_name: 'Team Alpha',
        group_type: 'group',
        created_at: new Date(),
      },
      {
        team_name: 'Team Beta',
        group_type: 'partner',
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teams', null, {});
  },
};
