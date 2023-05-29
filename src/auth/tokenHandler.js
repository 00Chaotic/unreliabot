const { RefreshingAuthProvider, exchangeCode } = require('@twurple/auth');

const authTokenHandler = require('../db/authTokenHandler');

/**
 * Creates and saves a refreshing user access token
 * @param { Sequelize } db Sequelize database connection
 * @param { String } authCode Authorization code used to get an access token
 * @returns { Error }
 */
exports.addUserToken = async (db, authCode) => {

  const initialToken = await exchangeCode(process.env.CLIENT_ID, process.env.CLIENT_SECRET, authCode, process.env.TWITCH_AUTH_REDIRECT_URI);

  await new RefreshingAuthProvider({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    onRefresh: async (userId, newTokenData) => await authTokenHandler.UpsertOne(db, userId, newTokenData),
  })
    .addUserForToken(initialToken)
    .then((userId) => {
      const isSaved = authTokenHandler.UpsertOne(db, userId, initialToken);

      if (!isSaved) {
        throw new Error('Error upserting user access token');
      }
    })
    .catch((err) => {
      return new Error('Error adding user access token: ' + err);
    });

  return null;
};