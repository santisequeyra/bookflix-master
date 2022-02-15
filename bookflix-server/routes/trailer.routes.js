const express = require('express');
const router = express.Router();

const TrailerCtrl = require('../controllers/trailers.controller.js');

router.get('/', TrailerCtrl.getTrailers);
router.get('/:id', TrailerCtrl.getTrailer);
router.post('/', TrailerCtrl.createTrailer);
router.delete('/', TrailerCtrl.deleteTrailer);

module.exports = router;
