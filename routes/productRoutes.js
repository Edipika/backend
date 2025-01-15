const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addProduct, updateProduct, deleteProduct, showproducts } = require('../controllers/productController'); 

// Define the POST route for adding a product
router.post('/add',addProduct);
router.post('/edit', updateProduct);
router.delete('/delete', deleteProduct);
router.get('/show', showproducts);

module.exports = router; // Export the router