const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));


app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

app.set('json spaces', '\t');

module.exports = app;
