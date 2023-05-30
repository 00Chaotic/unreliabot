const { RefreshingAuthProvider } = require('@twurple/auth');

const authTokenHandler = require('../db/authTokenHandler');

/**
 * Returns a new `RefreshingAuthProvider` instance with the relevant fields
 * @returns { RefreshingAuthProvider }
 */
module.exports = (db) => {

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