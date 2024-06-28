'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class accountDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accountDetails.belongsTo(models.driverProfile, { foreignKey: 'driverProfileId' })
    }
  }
  accountDetails.init(
    {
      isVerified: DataTypes.BOOLEAN,
      driverProfileId: DataTypes.INTEGER,
      accontName: DataTypes.STRING,
      bankName: DataTypes.STRING,
      accountNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'accountDetails',
    },
  )
  return accountDetails
}
