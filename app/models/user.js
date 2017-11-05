var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({ 
    login: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    birthdate: Date,
    country: String,
    city: String
}));