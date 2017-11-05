var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Account', new Schema({
    name: String,
    value: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
}));