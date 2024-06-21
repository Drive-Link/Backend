'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class identificationCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      identificationCard.belongsTo(models.driverProfile, { foreignKey: 'driverProfileId' })
    }
  }
  identificationCard.init(
    {
      isVerified: DataTypes.BOOLEAN,
      driverProfileId: DataTypes.INTEGER,
      identificationCardBack: DataTypes.STRING,
      identificationCardFront: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'identificationCard',
    },
  )
  return identificationCard
}
