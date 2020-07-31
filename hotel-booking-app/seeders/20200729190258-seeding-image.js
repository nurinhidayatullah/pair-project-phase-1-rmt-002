'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('is', [
      {
        source: 'mariot.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        source: '111.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        source: '1.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        source: 'download1.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        source: 'h.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('is', null, {})
  }
};
