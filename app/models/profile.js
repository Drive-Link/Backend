'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile.belongsTo(models.passengers, { foreignKey: 'passengerId' })
      profile.hasMany(models.cars, { foreignKey: 'profileId' })
      profile.hasMany(models.trustedbuddy, { foreignKey: 'profileId' })
      profile.hasOne(models.card, { foreignKey: 'profileId' })
    }
  }
  profile.init(
    {
      isVerified: DataTypes.STRING,
      referralCode: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      shortBio: DataTypes.STRING,
      passengerId: DataTypes.INTEGER,

      role: DataTypes.STRING,
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
      modelName: 'profile',
      timestamps: true,
    },
  )
  return profile
}
