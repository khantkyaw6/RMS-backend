const authController = require('../../controllers/authController');

const router = require('express').Router();

router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);

module.exports = router;
