const express = require('express');
const router = express.Router();

const authorCtrl = require('../controllers/author.controller.js');

router.get('/', authorCtrl.getAuthors);
router.post('/', authorCtrl.createAuthor);
router.get('/:id', authorCtrl.getAuthor);
router.put('/:id', authorCtrl.editAuthor);
router.delete('/:id', authorCtrl.deleteAuthor);

module.exports = router;