const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    profiles: [{type: mongoose.ObjectId, required: true, ref: 'Profile', autopopulate: true}],
    credit_card: {type: mongoose.ObjectId, required: true, ref: 'CreditCard', autopopulate: true},
    plan: {type: String, enum: ['STANDARD', 'PREMIUM'], default: 'STANDARD'}
});

AccountSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Account', AccountSchema);
