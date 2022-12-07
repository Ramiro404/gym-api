'use strict';

const { CLIENT_MEMBERSHIP_TABLE, ClientMembershipSchema } = require('../models/client-membership.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CLIENT_MEMBERSHIP_TABLE, ClientMembershipSchema)
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down () {
    //await queryInterface.dropTable(CLIENT_MEMBERSHIP_TABLE)
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
