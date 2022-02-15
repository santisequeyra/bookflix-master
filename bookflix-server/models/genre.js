const mongoose = require('mongoose');
const { Schema } = mongoose;

const GenreSchema = new Schema({
    name: {type: String, required: true, unique: true},
    books: { type: [mongoose.ObjectId], default: [], ref: 'Book' }
})

module.exports = mongoose.model('Genre', GenreSchema);