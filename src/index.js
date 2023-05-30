const app = require('./routes');
const newDBConnection = require('./db/init');
const newRefreshingAuthProvider = require('./auth/provider');
const { restoreAccessTokens } = require('./auth/tokenHandler');

/**
 * Run program
 */
const run = async () => {

  // Initialise db connection
  let dbConn;
  try {
    dbConn = await newDBConnection();
  } catch (err) {
    console.error('Error initialising database connection: ' + err.message);
  }

  // Create new auth provider
  const refreshingAuthProvider = newRefreshingAuthProvider(dbConn);

  // Add existing tokens to auth provider
  try {
    await restoreAccessTokens(refreshingAuthProvider, dbConn);
  } catch (err) {
    console.error('Error restoring access tokens: ' + err.message);
  }

  app.set('db', dbConn);
  app.set('authProvider', refreshingAuthProvider);

  app.listen(3001, () => {
    console.log('Listening on port 3001...');
  });
};

run();