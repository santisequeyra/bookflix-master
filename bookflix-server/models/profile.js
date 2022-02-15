const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: {type: String, required: true},
    readings: [{type: mongoose.ObjectId, required: false, ref: 'Reading', autopopulate: true}],
    reviews: [{type: mongoose.ObjectId, required: false, ref: 'Review', autopopulate: true}],
    favourites: [{ type: mongoose.ObjectId, required: false, ref: 'Book' }]
});

ProfileSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Profile', ProfileSchema, 'profiles');
