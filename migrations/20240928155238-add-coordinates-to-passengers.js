'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('passengers', 'lat_coordinate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('passengers', 'lon_coordinate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('passengers', 'lat_coordinate');
    await queryInterface.removeColumn('passengers', 'lon_coordinate');
  }
};
