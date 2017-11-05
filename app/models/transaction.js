var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Transaction', new Schema({
    value: Number,
    message: String,
    date: Date,
    account: { type: Schema.Types.ObjectId, ref: 'Account' }
}));