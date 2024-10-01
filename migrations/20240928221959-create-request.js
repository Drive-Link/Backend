'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PassengerId: {
        type: Sequelize.INTEGER
      },
      DriverId: {
        type: Sequelize.INTEGER
      },
      requestStatus: {
        type: Sequelize.ENUM('Pending', 'Accepted', 'Cancelled', 'Completed'),
        defaultValue: 'Pending',
        allowNull: false,
      },
      driver_location: {
        type: Sequelize.STRING
      },
      passenger_location: {
        type: Sequelize.STRING
      },

      // driver_location_name: {
      //   type: Sequelize.STRING
      // },
      // passenger_location_name: {
      //   type: Sequelize.STRING
      // },




      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Requests');
  }
};