const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    title: { type: String },
    description: { type: String},
    rating: { type: Number, required: true },
    spoiler: { type: Boolean, required: true },
    date: { type: Date, required: true },
    book: { type: mongoose.ObjectId, required: true , ref: 'Book', autopopulate: true},
    profile: { type: mongoose.ObjectId, required: true , ref: 'Profile'}
});

ReviewSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Review', ReviewSchema);
