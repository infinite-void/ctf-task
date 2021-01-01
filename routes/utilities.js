const express = require('express');
const router = express.Router();

const validator = require('../validators/index');
const auth = require('../controllers/auth');
const operations = require('../controllers/operations');

router.post('/add', validator.addValidator, auth.authenticateUser, operations.add);
router.post('/delete', validator.deleteValidator, auth.authenticateUser, operations.delete);
router.post('/update', validator.updateValidator, auth.authenticateUser, operations.update);
router.get('/findrecord', validator.findValidator, auth.authenticateUser, operations.findrecord);
router.get('/listall', auth.authenticateUser, operations.listall);

module.exports = router;