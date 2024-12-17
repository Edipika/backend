'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // const hashedPassword = await bcrypt.hash('demoPassword', 10);
    await queryInterface.bulkInsert('Users', [{
      name: 'demoUser',
      email: 'demoUser@gmail.com',
      password: 'hashedPassword',
      role:2,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
