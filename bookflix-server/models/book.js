const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
    title: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publisher: { type: mongoose.ObjectId, required: true, ref: 'Publisher' },
    genre: { type: mongoose.ObjectId, required: true,  ref: 'Genre' },
    author: { type: mongoose.ObjectId, required: true, ref: 'Author' },
    reviews: [{ type: [mongoose.ObjectId], default: [], ref: 'Review', autopopulate: false }],
    trailers:  [{ type: mongoose.ObjectId, ref: 'Trailer', autopopulate: true }],
    file:  { type: [mongoose.ObjectId], default: [], ref: 'Bookfile' },
    complete: { type: Boolean, required: true },
    cover: { type: mongoose.ObjectId, default: null },
    timesread: { type: Number, default: 0 },
    date: { type: Date, required: true }
});

BookSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Book', BookSchema);
