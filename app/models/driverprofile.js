'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class driverProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      driverProfile.belongsTo(models.driver, { foreignKey: 'driverId' })
      driverProfile.hasOne(models.driverLicense, { foreignKey: 'driverProfileId' })
      driverProfile.hasMany(models.accountDetails, { foreignKey: 'driverProfileId' })
      driverProfile.hasOne(models.identificationCard, { foreignKey: 'driverProfileId' })
      driverProfile.hasOne(models.medicalReport, { foreignKey: 'driverProfileId' })
    }
  }
  driverProfile.init(
    {
      profilePicture: DataTypes.STRING,
      isVerified: DataTypes.STRING,
      driverId: DataTypes.INTEGER,
      profilePictureVideo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'driverProfile',
    },
  )
  return driverProfile
}
