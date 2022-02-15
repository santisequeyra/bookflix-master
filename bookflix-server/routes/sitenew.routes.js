const express = require('express');
const router = express.Router();

const siteNewCtrl = require('../controllers/sitenew.controller.js');

router.get('/', siteNewCtrl.getSiteNews);
router.post('/', siteNewCtrl.createSiteNew);
router.get('/:id', siteNewCtrl.getSiteNew);
router.put('/:id', siteNewCtrl.editSiteNew);
router.delete('/:id', siteNewCtrl.deleteSiteNew);

module.exports = router;