'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        username: 'alice',
        email: 'alice@example.com',
        password_hash: 'hashedpassword123',
        created_at: new Date(),
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        password_hash: 'hashedpassword456',
        created_at: new Date(),
      },
    ];

    for (const user of users) {
      await queryInterface.sequelize.models.User.upsert(user);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};


