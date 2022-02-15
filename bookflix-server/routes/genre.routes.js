const express = require('express');
const router = express.Router();

const genreCtrl = require('../controllers/genre.controller.js');

router.get('/', genreCtrl.getGenres);
router.post('/', genreCtrl.createGenre);
router.get('/:id', genreCtrl.getGenre);
router.put('/:id', genreCtrl.editGenre);
router.delete('/:id', genreCtrl.deleteGenre);

module.exports = router;