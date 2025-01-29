const express = require('express');
const router = express.Router();
// const { adminlogin } = require('../controllers/login-controller');
const { showCategories } = require('../controllers/categoryController');



// Define the POST route for adding a category
// router.post('/adminLogin', adminlogin);
router.get('/protected' , showCategories);

router.post('/verify-token',showCategories);
router.get('/verify-token', );
// router.get('/adminLogin',adminlogin);

module.exports = router; // Export the router


