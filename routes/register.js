const express = require('express');
const router = express.Router();
const {registration} = require('../controllers/RegistrationController');
const upload = require('../middleware/multer');

router.post('/register',upload.none(), registration);

module.exports = router;