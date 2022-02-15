const express = require('express');
const router = express.Router();

const fileCtrl = require('../controllers/file.controller.js');

router.get('/downloads/cover/:id', fileCtrl.downloadCover);
router.post('/uploads/cover/:id', fileCtrl.uploadCover);
router.delete('/cover/:id', fileCtrl.deleteCover);

router.get('/downloads/content/:id', fileCtrl.downloadBook);
router.post('/uploads/content/', fileCtrl.uploadBook);
router.delete('/content/:id', fileCtrl.deleteBook);

module.exports = router;