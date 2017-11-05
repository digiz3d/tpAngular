const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const mongoose = require('mongoose');
const User = require('./app/models/user');
const Account = require('./app/models/account');
const Transaction = require('./app/models/transaction');
mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* routes declarations */
const apiRoutes = express.Router();


apiRoutes.get('/', function (req, res) {
  res.send({
    message: 'Welcome to our API. Please authenticate using POST name and password at /api/authenticate'
  });
});

apiRoutes.post('/authenticate', function (req, res) {
  if (req.body.login === 'test' && req.body.password === 'test') {
    let token = jwt.sign({ login: 'test' }, config.jwtSecret, { expiresIn: 60 * 60 });

    res.cookie('token', token);
    res.send({
      success: true,
      message: 'Enjoy your token',
      token: token
    });
  }
  else {
    res.send({
      success: false,
      message: "no no no"
    });
  }
});

apiRoutes.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

  if (token) {
    jwt.verify(token, config.jwtSecret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

apiRoutes.get('/accounts', function (req, res) {
  res.send([
    { id: 1, name: 'Compte courant', amount: 8000, user: 69 },
    { id: 2, name: 'Compte PEL', amount: 35000, user: 69 },
    { id: 3, name: 'Livret A', amount: 2500, user: 69 },
    { id: 4, name: 'Compte pro suisse', amount: 15000, user: 69 }
  ]);
});

/* lets use the routes now */
app.use('/api', apiRoutes);

app.listen(3000, function () {
  console.log('API server listening on port 3000!');
});

app.set('json spaces', '\t');

module.exports = app;
