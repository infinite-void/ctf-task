const express = require('express');
const router = express.Router();

const validator = require('../validators/index');
const register = require('../controllers/register');
const login = require('../controllers/login');

router.post('/register', validator.registerValidator, register.register);
router.post('/signin', validator.signinValidator, login.signin);
router.get('/verify', validator.verifyValidator, register.verify);
router.get('/resetpass', validator.resetpassValidator, login.resetpass);
router.post('/forgotpass', validator.forgotpassValidator, login.forgotpass);

module.exports = router;