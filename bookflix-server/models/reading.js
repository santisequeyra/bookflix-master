const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReadingSchema = new Schema({
    book: {type: mongoose.ObjectId, required: true, ref: 'Book', autopopulate: true},
    current_page: {type: Number, required: true, default: 1}
});

ReadingSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Reading', ReadingSchema);
