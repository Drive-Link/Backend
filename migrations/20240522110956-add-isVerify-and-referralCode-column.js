'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('passengers', 'isVerify', {
      type: Sequelize.STRING,
      defaultValue: 'false',
    })
    await queryInterface.addColumn('passengers', 'referralCode', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('passengers', 'isVerify')
    await queryInterface.removeColumn('passengers', 'referralCode')
  },
}
