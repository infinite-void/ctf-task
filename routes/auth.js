const express = require('express');
const router = express.Router();

const validator = require('../validators/index');
const register = require('../controllers/register');
const login = require('../controllers/login');

router.post('/register', register.register);
router.post('/signin', login.signin);
router.get('/verify', register.verify);
//router.get('/resetpass',validator.resetlinkValidator, login.resetpass);
//router.post('/forgotPwd', validator.userForgotPwdValidator, login.forgotPwd);

module.exports = router;