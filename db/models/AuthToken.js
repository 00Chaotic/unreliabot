'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuthToken.init({
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    access_token: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    expires_in: DataTypes.INTEGER,
    obtainment_timestamp: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    refresh_token: DataTypes.STRING,
    scope: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
    }
  }, {
    sequelize,
    modelName: 'auth_token',
    timestamps: false
  });
  return AuthToken;
};