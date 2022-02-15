const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditCardSchema = new Schema({
    number: {type: String, required: true},
    due_date: {type: String, required: true},
    code: {type: String, required: true},
});

module.exports = mongoose.model('CreditCard', CreditCardSchema, 'creditcards');
