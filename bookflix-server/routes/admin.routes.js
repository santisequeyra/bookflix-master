const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');

router.post('/register', controller.createAdmin);
router.post('/login', controller.loginAdmin);
router.put('/logout', controller.logoutAdmin)

module.exports = router;