const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller');


router.post('/register', controller.register);
router.post('/login', controller.login);
router.put('/logout', controller.logout)

router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.delete('/:id', controller.deleteUser);

router.put('/password', controller.changePassword)
router.put('/credit-card', controller.changeCreditCard)
router.put('/plan', controller.changePlan)
router.put('/readings', controller.readBook)

router.post('/profiles', controller.addProfile)
router.delete('/:user_id/:profile_id', controller.deleteProfile)

module.exports = router;
