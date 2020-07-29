'use strict';

const { query } = require("express");

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
      username: 'leonardo dicaprio',
      password: '123456',
      type: 'customer',
      status: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      username: 'hotelier',
      password: '123456',
      type: 'hotel',
      status: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    return queryInterface.bulkInsert('Users', data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', data)
  }
};
