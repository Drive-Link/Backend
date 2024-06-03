'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      carName: {
        type: Sequelize.STRING,
      },
      carBrand: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      plateNumber: {
        type: Sequelize.STRING,
      },
      profileId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'profiles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cars')
  },
}
