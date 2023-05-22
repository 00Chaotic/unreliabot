'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auth_token', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      access_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expires_in: {
        type: Sequelize.TIME
      },
      obtainment_timestamp: {
        allowNull: false,
        type: Sequelize.TIME
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      scope: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('auth_token');
  }
};