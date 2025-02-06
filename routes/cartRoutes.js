const express = require('express');
const router = express.Router();
const { addToCart} = require('../controllers/cartController');

// Define the POST route for adding a category
router.post('/update', addToCart);

module.exports = router;