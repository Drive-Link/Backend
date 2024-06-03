'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class trustedbuddy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trustedbuddy.belongsTo(models.profile, { foreignKey: 'profileId' })
    }
  }
  trustedbuddy.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      profileId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'trustedbuddy',
    },
  )
  return trustedbuddy
}
