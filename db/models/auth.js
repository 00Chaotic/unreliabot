'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  auth.init({
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    accessToken: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    expiresIn: DataTypes.TIME,
    obtainmentTimestamp: {
      allowNull: false,
      type: DataTypes.TIME,
    },
    refreshToken: DataTypes.STRING,
    scope: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
    }
  }, {
    sequelize,
    modelName: 'auth',
    timestamps: false
  });
  return auth;
};