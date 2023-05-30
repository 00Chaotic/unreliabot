const app = require('./routes');
const newDBConnection = require('./db/init');
const { restoreAccessTokens } = require('./auth/tokenHandler');

/**
 * Run program
 */
const run = async () => {

  let dbConn;

  try {
    dbConn = await newDBConnection();
  } catch (err) {
    console.error('Error initialising database connection: ' + err.message);
  }

  try {
    await restoreAccessTokens(dbConn);
  } catch (err) {
    console.error('Error restoring access tokens: ' + err.message);
  }

  app.set('db', dbConn);

  app.listen(3001, () => {
    console.log('Listening on port 3001...');
  });
};

run();