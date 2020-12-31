const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
router.post('/add', auth.AunthenticateUser);
module.exports = router;