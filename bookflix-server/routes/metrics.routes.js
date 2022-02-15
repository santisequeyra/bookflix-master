const express = require('express');
const router = express.Router();

const metricsCtrl = require('../controllers/metrics.controller.js');

router.get('/topbooks', metricsCtrl.topReadBooks);
router.get('/users', metricsCtrl.getUsersMetric);


module.exports = router;
