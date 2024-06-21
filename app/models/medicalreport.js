'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class medicalReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      medicalReport.belongsTo(models.driverProfile, { foreignKey: 'driverProfileId' })
    }
  }
  medicalReport.init(
    {
      isVerified: DataTypes.BOOLEAN,
      driverProfileId: DataTypes.INTEGER,
      documentFile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'medicalReport',
    },
  )
  return medicalReport
}
