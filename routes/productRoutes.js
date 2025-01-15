const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addProduct, UpdateProduct, deleteProduct, showproducts } = require('../controllers/productController'); 

// Define the POST route for adding a product
router.post('/add',addProduct);
router.post('/edit', UpdateProduct);
router.delete('/delete', deleteProduct);
router.get('/show', showproducts);

module.exports = router; // Export the router