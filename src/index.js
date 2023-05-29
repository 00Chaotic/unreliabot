const app = require('./routes');
const newDBConnection = require('./db/init');

const { dbConn, err } = newDBConnection();
if (err) {
  console.error('Error initialising database connection: ' + err);
}

app.set('db', dbConn);

app.listen(3001, () => {
  console.log('Listening on port 3001...');
});