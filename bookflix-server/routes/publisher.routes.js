const express = require('express');
const router = express.Router();

const publisherCtrl = require('../controllers/publisher.controller.js');

router.get('/', publisherCtrl.getPublishers);
router.post('/', publisherCtrl.createPublisher);
router.get('/:id', publisherCtrl.getPublisher);
router.put('/:id', publisherCtrl.editPublisher);
router.delete('/:id', publisherCtrl.deletePublisher);

module.exports = router;