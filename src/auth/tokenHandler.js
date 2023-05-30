const { RefreshingAuthProvider, exchangeCode } = require('@twurple/auth');

const authTokenHandler = require('../db/authTokenHandler');

exports.restoreAccessTokens = async (db) => {

  if (!db) {
    throw new Error('Missing database instance');
  }

  const authTokens = await authTokenHandler.FindAll(db);

  authTokens.forEach((value) => {
    const accessToken = toAccessToken(value);
    newRefreshingAuthProvider().addUser(value.user_id, accessToken);
  });
};

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

  try {
    const userId = await newRefreshingAuthProvider(db).addUserForToken(initialToken);
    await authTokenHandler.UpsertOne(db, userId, initialToken);
  } catch (err) {
    throw new Error('Error adding user access token: ' + err.message);
  }
};

/**
 * @returns { RefreshingAuthProvider } new `RefreshingAuthProvider` instance
 */
const newRefreshingAuthProvider = (db) => {

  return new RefreshingAuthProvider({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    onRefresh: async (userId, newTokenData) => {
      try {
        await authTokenHandler.UpsertOne(db, userId, newTokenData);
      } catch (err) {
        console.error('Error upserting auth token: ' + err.message);
      }
    },
  });
};

/**
 * Converts AuthToken database model object to AccessToken twurple object
 * @param { AuthToken } authToken AuthToken model returned from database
 * @returns  { import('@twurple/auth').AccessToken }
 */
const toAccessToken = (authToken) => {

  return {
    accessToken: authToken.access_token,
    expiresIn: authToken.expires_in,
    obtainmentTimestamp: authToken.obtainment_timestamp,
    refreshToken: authToken.refresh_token,
    scope: authToken.scope,
  };
};