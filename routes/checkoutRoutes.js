const express = require('express');
const router = express.Router();
const { processCheckout,fetchOrderDetails } = require('../controllers/checkoutController');



router.post('/checkout', processCheckout);
router.get('/orders', fetchOrderDetails);


module.exports = router;