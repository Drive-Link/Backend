'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isVerified: {
        type: Sequelize.STRING,
        defaultValue: 'false',
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      referralCode: {
        type: Sequelize.STRING,
      },
      shortBio: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      passengerId: {
        unique: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'passengers',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      // driverId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'drivers',
      //     key: 'id',
      //   },
      // },
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
    await queryInterface.dropTable('profiles')
  },
}
