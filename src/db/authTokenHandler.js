const AuthTokenModelFunc = require('../../db/models/AuthToken');
const { DataTypes } = require('sequelize');

/**
 * Upserts one AuthToken record into the `auth_token` table
 * @param { Sequelize } db Sequelize database connection
 * @param { String } userId User's Twitch ID
 * @param { import('@twurple/auth/lib').AccessToken } token Twurple access token
 * @returns { Boolean } True if record was successfully created
 */
exports.UpsertOne = async (db, userId, token) => {
  const AuthTokenModel = AuthTokenModelFunc(db, DataTypes);

  const [ , created ] = await AuthTokenModel.upsert({
    user_id: userId,
    access_token: token.accessToken,
    expires_in: token.expiresIn,
    obtainment_timestamp: token.obtainmentTimestamp,
    refresh_token: token.refreshToken,
    scope: token.scope,
  });

  return created;
};

// Sample findOne query
// AuthTokenModel.findOne({
//   attributes: ['user_id', 'access_token', 'expires_in', 'obtainment_timestamp', 'refresh_token', 'scope'],
//   where: {
//     user_id: '1',
//   },
// })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });