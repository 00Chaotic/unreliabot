const AuthTokenModelFunc = require('../../db/models/AuthToken');
const { DataTypes } = require('sequelize');

/**
 * Upserts one AuthToken record into the `auth_token` table
 * @param { Sequelize } db Sequelize database connection
 * @param { String } userId User's Twitch ID
 * @param { import('@twurple/auth/lib').AccessToken } token Twurple access token
 */
exports.UpsertOne = async (db, userId, token) => {

  const AuthTokenModel = AuthTokenModelFunc(db, DataTypes);

  await AuthTokenModel.upsert({
    user_id: userId,
    access_token: token.accessToken,
    expires_in: token.expiresIn,
    obtainment_timestamp: token.obtainmentTimestamp,
    refresh_token: token.refreshToken,
    scope: token.scope,
  });
};

/**
 * Retrieves all AuthToken records from `auth_token` table
 * @param {*} db Sequelize database connection
 * @returns { Promise<AuthToken[]> } List of AuthToken records
 */
exports.FindAll = async (db) => {

  const AuthTokenModel = AuthTokenModelFunc(db, DataTypes);

  return await AuthTokenModel.findAll();
};