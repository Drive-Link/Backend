'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class passengers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      passengers.hasOne(models.profile, { foreignKey: 'passengerId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }
  passengers.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      hash: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      lat_coordinate: DataTypes.STRING,
      lon_coordinate: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'passengers',
      timestamps: true,
    },
  )
  return passengers
}
