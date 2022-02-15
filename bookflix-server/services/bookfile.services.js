const mongoose = require('mongoose');
const Book = require('../models/book.js')

const bookFileServices = {};

bookFileServices.addBookFile = async (doc) => {
    await Book.updateOne({ _id: doc.book }, { $push: { file: doc } });
};

bookFileServices.removeBookFile = async (doc) => {
    try {
    await Book.findOneAndUpdate({ _id: doc.book }, { $pull: { file: doc._id }});
    } catch {
        console.log('Book deletion failed');
    };
    try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    bucket.delete( mongoose.Types.ObjectId(doc.fileId), (err) => {
        if (err) throw err;
    });
    } catch (err) {
        console.log('Tried to delete non existent file');
    };
};

module.exports = bookFileServices;