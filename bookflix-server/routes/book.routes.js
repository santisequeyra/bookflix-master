const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/book.controller.js');

router.get('/', bookCtrl.getBooks);
router.get('/search', bookCtrl.search);
router.post('/', bookCtrl.createBook);
router.post('/:id', bookCtrl.increaseCount);
router.get('/:id', bookCtrl.getBook);
router.put('/:id', bookCtrl.editBook);
router.put('/meta/:id', bookCtrl.editBook);
router.delete('/:id', bookCtrl.deleteBook);

module.exports = router;
