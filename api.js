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
const mailer = require('./mailer');

mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* routes declarations */
const apiRoutes = express.Router();


apiRoutes.get('/', function (req, res) {
  res.json({
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
          res.status(500).json({success: false, message: err.message});
        }
        else {
          if (result) {
            let token = jwt.sign({ id: user.id, login: user.login, email:user.email }, config.jwtSecret, { expiresIn: 60 * 60 });
            res.cookie('token', token);
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });

          }
          else {
            res.status(401).json({ success: false, message: 'Wrong username or password' });
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
        return res.json({
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
    return res.status(403).json({
      success: false,
      message: 'No token provided.'
    });
  }
});

apiRoutes.get('/accounts', function (req, res) {
  Account.find({ owner: req.decoded.id }, function (err, accs) {
    res.json(accs);
  });
});

apiRoutes.get('/accounts/:id', function (req, res) {
  Account.findOne({ _id: req.params.id, owner: req.decoded.id}, function (err, acc) {
    res.json(acc);
  });
});

apiRoutes.post('/accounts', function(req, res) {
  if (req.body.value < 0) {
    return res.json({ success: false, message: "Negative amount not allowed." });
  }
  if (req.body.name.trim() == "") {
    return res.json({ success: false, message: "An account needs a name omg." });
  }
  
  let account = new Account({name: req.body.name, value: req.body.value, owner: mongoose.Types.ObjectId(req.decoded.id)});
  account.save(function(err) {
    if (err) throw err;

    res.json({ success: true });
    mailer.send(req.decoded.email, "New account created", "You've just created a new account : \"" + req.body.name + "\" with " + req.body.value + "€");
  });
});

apiRoutes.get('/transactions/:bankAccountId', function (req, res) {
  Account.findOne({ owner: req.decoded.id, _id: req.params.bankAccountId }, function (err, acc) {
    if (err) throw err;

    if (acc) {
      Transaction.find({ account: acc._id }, function (err2, trs) {
        res.json(trs);
      });
    }
    else {
      res.json({success: false});
    }
  });
});

apiRoutes.post('/transactions/:bankAccountId', function (req, res) {
  if (req.body.message.trim() == "") {
    return res.json({ success: false, message: "An account needs a name omg." });
  }

  Account.findOne({ owner: req.decoded.id, _id: req.params.bankAccountId }, function (err, acc) {
    if (err) throw err;

    if (acc) {
      let transaction = new Transaction({ value: req.body.value, message: req.body.message, date: Date.now(), account: mongoose.Types.ObjectId(req.params.bankAccountId) });
      transaction.save(function (err) {
        if (err) throw err;

        acc.value += transaction.value;
        acc.save(function(err2) {
          if (err2) throw err2;

          res.json({ success: true, transaction: transaction });
        });
        
        mailer.send(req.decoded.email, "New transaction added", "You've just added a new transaction : " + req.body.value + "€, \"" + req.body.message + "\"");
      });
    }
    else {
      res.json({});
    }
  });
});

/* lets use the routes now */
app.use('/api', apiRoutes);

app.listen(3000, function () {
  console.log('API server listening on port 3000!');
});

app.set('json spaces', '\t');

module.exports = app;
