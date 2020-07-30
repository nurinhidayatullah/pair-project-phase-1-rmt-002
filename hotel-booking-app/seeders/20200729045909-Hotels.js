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

      let data = [{
        name: 'Marriot',
        location: 'Jakarta',
        roomsavailable: 30,
        price: 1000000,
        IId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }]

   return queryInterface.bulkInsert('Hotels', data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return queryInterface.bulkDelete('Hotels', data)
  }
};
