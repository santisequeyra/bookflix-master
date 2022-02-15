const express = require('express');
const router = express.Router();

const ReviewsCtrl = require('../controllers/reviews.controller.js');

router.get('/', ReviewsCtrl.getReviews);
router.get('/:id', ReviewsCtrl.getReview);
router.post('/', ReviewsCtrl.createReview);
router.delete('/', ReviewsCtrl.deleteReview);
router.put('/', ReviewsCtrl.setSpoiler);

module.exports = router;
