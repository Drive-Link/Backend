'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    // static associate(models) {
    //   // Associations
    //   Request.belongsTo(models.passengers, { foreignKey: 'PassengerId' });
    //   Request.belongsTo(models.driver, { foreignKey: 'DriverId' });
    // }
  }

  Request.init({
    PassengerId: DataTypes.INTEGER,
    DriverId: DataTypes.INTEGER,

    requestStatus: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Cancelled', 'Completed'),
      defaultValue: 'Pending',
    },
    driver_location: DataTypes.STRING,  // JSON format: { lat: 'xx', lon: 'yy' }
    passenger_location: DataTypes.STRING,  // JSON format: { lat: 'xx', lon: 'yy' }
    // driver_location_name: DataTypes.STRING, 
    // passenger_location_name: DataTypes.STRING,  // JSON format: { lat: 'xx', lon: 'yy' }

  }, {
    sequelize,
    modelName: 'Request',
    timestamps: true,
  });

  return Request;
};
