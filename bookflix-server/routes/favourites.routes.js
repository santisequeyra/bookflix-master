const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');

router.get('/:id', controller.getFavourites);
router.post('/:id', controller.setFavourite);
router.delete('/:id', controller.removeFavourite);

module.exports = router;