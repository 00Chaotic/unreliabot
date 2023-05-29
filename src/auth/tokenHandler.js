const { RefreshingAuthProvider, exchangeCode } = require('@twurple/auth');

const authTokenHandler = require('../db/authTokenHandler');

/**
 * Creates and saves a refreshing user access token
 * @param { Sequelize } db Sequelize database connection
 * @param { String } authCode Authorization code used to get an access token
 */
exports.addUserToken = async (db, authCode) => {

  if (!db || !authCode) {
    throw new Error('Missing database instance or authorization code');
  }

  const initialToken = await exchangeCode(process.env.CLIENT_ID, process.env.CLIENT_SECRET, authCode, process.env.TWITCH_AUTH_REDIRECT_URI);

  new RefreshingAuthProvider({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    onRefresh: async (userId, newTokenData) => {
      authTokenHandler.UpsertOne(db, userId, newTokenData)
        .catch(err => { throw new Error ('Error upserting auth token to database: ' + err); });
    },
  })
  .addUserForToken(initialToken)
  .catch(err => { throw new Error('Error adding user access token: ' + err); });
};