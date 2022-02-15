const Review = require('../models/review.js');
const booksServices = require('../services/book.services');
const profileServices = require('../services/profile.services');
const mongoose = require('mongoose');


const reviewServices = {}

function response(status, content) {
    return {
        status: status,
        data: content
    }
}

reviewServices.setSpoiler = async (spoilerData) => {
    return Review.findOneAndUpdate({_id: spoilerData.review_id}, { $set: {spoiler: spoilerData.spoiler}})
        .then(result => {
            console.log(result);
            return response(200, {message: `Spoiler setted to ${spoilerData.spoiler}`})
        })
        .catch(err => {
            console.log(err);
            return response(500, {message: "There was an error changing review spoiler status"})
        })
}

reviewServices.createReview = async (review) => {
    const date = Date.now();
    console.log(`Creating review with date ${date}`);
    review.date = date
    const newReview = new Review(review)
    return newReview.save()
        .then(dbReview => {
            const bookId = mongoose.Types.ObjectId(review.book)
            const profileId = mongoose.Types.ObjectId(review.profile)
            profileServices.addReview(dbReview._id, profileId)
            booksServices.addReview(dbReview._id, bookId)
            return response(200, {message: 'Review creado'})
        })
        .catch(err => {
            if (err) return response(500, {message: 'Server error'});
        })
}

reviewServices.getReviews = async () => {
    console.log("Getting reviews... ");
    return Review.find().populate('book')
        .then(reviews => {
            return response(200, reviews)
        })
        .catch(err => {
            if (err) return response(500, {message: 'Server error'});
        })
}

reviewServices.getReview = async (id) => {
    console.log(`Getting review with id ${id}`);
    const result = Review.findOne({ _id: id }).populate('book')
    return result
        .then(review => {
            if (review) return response(200, review)
            else return response(404, {message: 'Not found'})

        })
        .catch(err => {
            if (err) return response(500, {message: 'Server error'});
        })
}

reviewServices.deleteReview = async (reviewId, bookId) => {
    return Review.findOneAndDelete({ _id: reviewId })
        .then(_ => {
            console.log("Review borrado");
            booksServices.removeReview(reviewId, bookId)
            return response(200, {message: 'Review borrado'})
        })
        .catch(err => {
            if (err) return response(500, {message: 'Server error'});
        })
}


module.exports = reviewServices
