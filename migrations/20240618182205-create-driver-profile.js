'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('driverProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        index: true,
        type: Sequelize.INTEGER,
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      isVerified: {
        type: Sequelize.STRING,
        defaultValue: 'false',
      },
      driverId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        index: true,
        references: {
          model: 'drivers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      profilePictureVideo: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('driverProfiles')
  },
}
