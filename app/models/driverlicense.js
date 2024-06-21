'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class driverLicense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      driverLicense.belongsTo(models.driverProfile, { foreignKey: 'driverProfileId' })
    }
  }
  driverLicense.init(
    {
      isVerified: DataTypes.BOOLEAN,
      driverProfileId: DataTypes.INTEGER,
      pictureFront: DataTypes.STRING,
      pictureBack: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'driverLicense',
    },
  )
  return driverLicense
}
