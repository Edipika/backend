const express = require('express');
const router = express.Router();
const { adminlogin } = require('../controllers/login-controller');
const { showCategories } = require('../controllers/category-controller');
const verifyToken = require('../middleware/jwtMiddleware');


// Define the POST route for adding a category
router.post('/adminLogin', adminlogin);
router.get('/protected', verifyToken, showCategories);

router.post('/verify-token', verifyToken,showCategories);
router.get('/verify-token', verifyToken);
// router.get('/adminLogin',adminlogin);

module.exports = router; // Export the router


