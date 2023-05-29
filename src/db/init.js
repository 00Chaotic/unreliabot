const { Sequelize } = require('sequelize');

/**
 * Returns a new active Sequelize instance, or an error on failure
 * @returns {Sequelize | Error} Active Sequelize instance or an error
 */
module.exports = function newDBConnection() {

  const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING, {
    define: {
      freezeTableName: true,
    },
    // Only log SQL queries in dev env
    logging: (msg) => {
      process.env.NODE_ENV == 'DEV' ? console.debug(msg) : false;
    },
    pool: {
      acquire: 30000,
      idle: 10000,
      max: 5,
      min: 0,
    },
  });

  try {
    sequelize.authenticate();
    return { dbConn: sequelize };
  } catch (err) {
    return { error: err };
  }
};