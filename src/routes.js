const express = require('express');
const helmet = require('helmet');
const { query, validationResult, matchedData } = require('express-validator');

const { addUserToken } = require('./auth/tokenHandler');

const app = express();

app.use(helmet());
app.disable('x-powered-by');

app.get('/authorize',
  query('code').notEmpty().escape(),
  query('scope').notEmpty().escape(),
  query('state').notEmpty().escape(),
  async (req, res) => {
    const validationErr = validationResult(req);

    if (!validationErr.isEmpty()) {
      return res.status(400).send('Bad Request');
    }

    const data = matchedData(req);
    addUserToken(app.get('db'), data.code)
      .catch((err) => {
        console.error('Error completing authorization request: ' + err);
        return res.status(500).send('Internal Server Error');
      }
    );

    res.status(200).send('Successfully Authorized');
  },
);

module.exports = app;