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
        unique: true,
      },
      carBrand: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      plateNumber: {
        type: Sequelize.STRING,
        unique: true,
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cars')
  },
}
