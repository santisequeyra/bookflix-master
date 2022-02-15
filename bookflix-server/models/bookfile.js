const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookFileSchema = new Schema({
    fileId: { type: mongoose.ObjectId, unique: true },
    release: { type: Date, default: Date.today },
    concealment: { type: Date, default: new Date(8640000000000000)  },
    chapternumber: { type: Number },
    book: { type: mongoose.ObjectId }
});

module.exports = mongoose.model('BookFile', BookFileSchema);