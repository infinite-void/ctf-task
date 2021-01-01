const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const operations = require('../controllers/operations');

router.post('/add', auth.authenticateUser, operations.add);
router.post('/delete', auth.authenticateUser, operations.delete);
router.post('/update', auth.authenticateUser, operations.update);
router.get('/findrecord', auth.authenticateUser, operations.findrecord);
router.get('/listall', auth.authenticateUser, operations.listall);

module.exports = router;