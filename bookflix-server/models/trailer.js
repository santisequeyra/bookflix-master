const mongoose = require('mongoose');
const { Schema } = mongoose;

const TrailerSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String},
    date: { type: Date, required: true },
    book: { type: mongoose.ObjectId, required: true , ref: 'Book' }
});

module.exports = mongoose.model('Trailer', TrailerSchema);
