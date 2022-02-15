const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const UserSchema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
    account: {type: mongoose.ObjectId, required: false, ref: 'Account', autopopulate: true}
}, {
    timestamps: true
});

UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', UserSchema);
