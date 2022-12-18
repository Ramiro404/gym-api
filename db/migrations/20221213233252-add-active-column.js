'use strict';

const { CLIENT_TABLE } = require('../models/client.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CLIENT_TABLE,'active', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CLIENT_TABLE, 'active');
  }
};
