const express = require('express');
const router = express.Router();
const { Login } = require('../controllers/authController');


router.post('/login', Login);
router.get('/loginnn', Login);

module.exports = router; // Export the router
