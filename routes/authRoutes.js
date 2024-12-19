// const express = require('express');
// const router = express.Router();
// const { Login } = require('../controllers/authController');


// router.post('/login', Login);
// router.get('/loginnn', Login);

// module.exports = router; // Export the router

const express = require('express');
const router = express.Router();
const {handleLogin} = require('../controllers/login-controller');

router.post('/', handleLogin);

module.exports = router;
