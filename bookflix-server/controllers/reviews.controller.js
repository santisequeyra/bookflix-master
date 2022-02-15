const reviewServices = require('../services/review.services');
const Validators = require('../utils/validators');

const reviewsController = {};

reviewsController.setSpoiler = async (req, res) => {
    try {
        console.log("Validating request...");
        if (!Validators.isValidId(req.body.review_id)) return res.status(400).send({message: "La review es invalida"});
        if (!Validators.isValidSpoilerValue(req.body.spoiler)) return res.status(400).send({message: "Spoiler debe ser true o false"});
        const spoilerResponse = await reviewServices.setSpoiler(req.body);
        return res.status(spoilerResponse.status).json(spoilerResponse.data);

    } catch (error) {
        console.log("REVIEW CREATION FAILED: ", error);
        return res.status(500).send({message: "There was an error creating the review. Check the logs."});
    }
};

reviewsController.createReview = async (req, res) => {
    try {
        console.log("Creating review with body... ", req.body);
        console.log("Validating request...");
        if (!Validators.isValidReview(req.body)) return res.status(400).send({message: "La review es invalida"});
        const reviewsResponse = await reviewServices.createReview(req.body);
        return res.status(reviewsResponse.status).json(reviewsResponse.data);

    } catch (error) {
        console.log("REVIEW CREATION FAILED: ", error);
        return res.status(500).send({message: "There was an error creating the review. Check the logs."});
    }
};

reviewsController.getReviews = async (req, res) => {
    try {
        const reviewsResponse = await reviewServices.getReviews();
        return res.status(reviewsResponse.status).json(reviewsResponse.data);

    } catch (error) {
        console.log("GETTING REVIEWS FAILED: ", error);
        return res.status(500).send({message: "There was an error getting reviews. Check the logs."});
    }
};

reviewsController.getReview = async (req, res) => {
    try {
        const reviewResponse = await reviewServices.getReview(req.params.id);
        return res.status(reviewResponse.status).json(reviewResponse.data);
    } catch (error) {
        console.log("GETTING REVIEW FAILED: ", error);
        return res.status(500).send({message: "There was an error getting review. Check the logs."});
    }
};

reviewsController.deleteReview = async (req, res) => {
    try {
        const reviewId = req.body.review_id;
        const bookId = req.body.book_id
        if (!Validators.isValidId(reviewId)) return res.status(400).send({message: "El id del review es invalido"});
        if (!Validators.isValidId(reviewId)) return res.status(400).send({message: "El id del libro es invalido"});
        console.log(`Deleting review with id ${reviewId}`);

        const reviewsResponse = await reviewServices.deleteReview(reviewId, bookId);
        return res.status(reviewsResponse.status).json(reviewsResponse.data);

    } catch (error) {
        console.log("REVIEW DELETE FAILED: ", error);
        return res.status(500).send({message: "There was an error deleting the review. Check the logs."});
    }
};

module.exports = reviewsController;
