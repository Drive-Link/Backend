'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('drivers', 'lat_coordinate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('drivers', 'lon_coordinate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('drivers', 'lat_coordinate');
    await queryInterface.removeColumn('drivers', 'lon_coordinate');
  }
};
