'use strict'
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert('admins', [
      {
        email: process.env.ADMIN_EMAIL,
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 11),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkDelete('admins', null, {})
  },
}
