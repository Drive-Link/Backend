'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cars.belongsTo(models.profile, { foreignKey: 'profileId' })
    }
  }
  cars.init(
    {
      carName: DataTypes.STRING,
      carBrand: DataTypes.STRING,
      type: DataTypes.STRING,
      plateNumber: DataTypes.STRING,
      profileId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'cars',
    },
  )
  return cars
}
