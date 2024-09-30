'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      driver.hasOne(models.driverProfile, { foreignKey: 'driverId' })
    }
  }
  driver.init(
    {
      lastName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      hash: DataTypes.STRING,
      shortBio: DataTypes.STRING,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      lat_coordinate: DataTypes.STRING,
      lon_coordinate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'driver',
    },
  )
  return driver
}
