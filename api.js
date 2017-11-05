const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  /*
  bcrypt.hash(req.body.password, 10, function(err, hashed){
    res.send({
      success: false,
      hashedpass: hashed
    });
  });
  */

  User.findOne({ login: req.body.login }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          res.status(500).send(err.message);
        }
        else {
          if (result) {
            let token = jwt.sign({ id: user.id, login: user.login }, config.jwtSecret, { expiresIn: 60 * 60 });
            res.cookie('token', token);
            res.send({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });

          }
          else {
            res.status(401).send({ success: false, message: 'Wrong username or password' });
          }
        }
      });
    }
  });
});

apiRoutes.use(function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

  if (token) {
    jwt.verify(token, config.jwtSecret, function (err, decoded) {
      if (err) {
        return res.send({
          success: false,
          message: 'Failed to authenticate token.'
        });
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
  Account.find({ owner: req.decoded.id}, function (err, accs) {
    res.send(accs);
  });
});

/* lets use the routes now */
app.use('/api', apiRoutes);

app.listen(3000, function () {
  console.log('API server listening on port 3000!');
});

app.set('json spaces', '\t');

module.exports = app;
