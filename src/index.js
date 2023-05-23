const AuthTokenModelFunc = require('../db/models/AuthToken');
const { DataTypes } = require('sequelize');
const NewDBConnection = require('./db/init');

const { dbConn, err } = NewDBConnection();
if (err) {
  console.error('Error initialising database connection: ' + err);
}

// Sample code to find an auth token record from db
const AuthTokenModel = AuthTokenModelFunc(dbConn, DataTypes);

AuthTokenModel.findOne({
  attributes: ['user_id', 'access_token', 'expires_in', 'obtainment_timestamp', 'refresh_token', 'scope'],
  where: {
    user_id: '1',
  },
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });