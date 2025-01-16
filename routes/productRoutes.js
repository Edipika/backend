const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addProduct, updateProduct, deleteProduct, showproducts } = require('../controllers/productController'); 

// Define the POST route for adding a product
router.post('/add',upload.single('image'), addProduct);
router.post('/edit', upload.single('image'), updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/show', showproducts);

module.exports = router; // Export the router