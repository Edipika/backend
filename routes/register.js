const express = require('express');
const router = express.Router();
const {userRegistration,adminRegistration} = require('../controllers/RegistrationController');

router.post('/', userRegistration);
router.post('/admin', adminRegistration);

module.exports = router;