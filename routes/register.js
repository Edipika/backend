const express = require('express');
const router = express.Router();
const {userRegistration} = require('../controllers/Registration-controller');

router.post('/', userRegistration);

module.exports = router;