const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* routes declarations */
const login = require('./routes/login');

/* lets use the routes now */
app.use('/api/login', login);

app.listen(3000, function () {
  console.log('API server listening on port 3000!');
});

app.set('json spaces', '\t');

module.exports = app;
