const Trailer = require('../models/trailer.js');
const booksServices = require('../services/book.services');
const mongoose = require('mongoose');


const trailerServices = {}

function response(status, content) {
    return {
        status: status,
        data: content
    }
}

trailerServices.createTrailer = async (trailer) => {
    const date = Date.now();
    console.log(`Creating trailer with date ${date}`);
    trailer.date = date
    const newTrailer = Trailer(trailer)
    return newTrailer.save()
        .then(dbTrailer => {
            const bookId = mongoose.Types.ObjectId(trailer.book)
            booksServices.addTrailer(dbTrailer._id, bookId)
            return response(200, {message: 'Trailer creado'})
        })
        .catch(err => {
            if (err) return response(500, {message: 'Server error'});
        })
}

trailerServices.getTrailers = async () => {
    console.log("Getting trailers... ");
    return Trailer.find().populate('book')
        .then(trailers => {
            return response(200, trailers)
        })
        .catch(err => {
            if (err) return response(500, {message: 'Server error'});
        })
}

trailerServices.getTrailer = async (id) => {
    console.log(`Getting trailer with id ${id}`);
    const result = Trailer.findOne({ _id: id }).populate('book')
    return result
        .then(trailer => {
            if (trailer) return response(200, trailer)
            else return response(404, {message: 'Not found'})

        })
        .catch(err => {
            if (err) return response(500, {message: 'Server error'});
        })
}

trailerServices.deleteTrailer = async (trailerId, bookId) => {
    return Trailer.findOneAndDelete({ _id: trailerId })
        .then(_ => {
            console.log("Trailer borrado");
            booksServices.removeTrailer(trailerId, bookId)
            return response(200, {message: 'Trailer borrado'})
        })
        .catch(err => {
            if (err) return response(500, {message: 'Server error'});
        })
}


module.exports = trailerServices
