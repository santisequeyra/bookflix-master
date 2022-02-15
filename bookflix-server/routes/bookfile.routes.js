const express = require('express');
const router = express.Router();

const bookFileCtrl = require('../controllers/bookfile.controller.js');

router.get('/', bookFileCtrl.getBookFiles);
router.get('/:id', bookFileCtrl.getBookFile);
router.post('/:id', bookFileCtrl.createBookFile);
router.put('/:id', bookFileCtrl.editBookFile);
router.delete('/:id', bookFileCtrl.deleteBookFile);

module.exports = router;
