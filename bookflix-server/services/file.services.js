const Book = require('../models/book');

const fileServices = {};


fileServices.addCover = async (bookId, coverId) => {
    await Book.updateOne({ _id: bookId }, { $set: { cover: coverId } });
};

fileServices.removeCover = async (bookId, callback) => {
    Book.findOne({ _id: bookId }, async (err, book) => {
        if (err) throw err;
        await Book.updateOne({ _id: bookId}, {$set: { cover: null }});
        if (callback) callback(book.cover);
    });
};


fileServices.bookExists = async (bookId) => {
    Book.findOne({ _id: bookId }, (err) => {
        if (err) return false;
        else { return true };
    });
};

module.exports = fileServices;