const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addProduct, updateProduct, deleteProduct, showproducts,logproducts } = require('../controllers/productController'); 

// Define the POST route for adding a product
router.post('/add',upload.single('image'), addProduct);
router.post('/edit', upload.single('image'), updateProduct);
router.delete('/delete/:productId', deleteProduct);
router.get('/show', showproducts);
router.get('/log', logproducts);


module.exports = router; // Export the router

// router.post('/add', (req, res, next) => {
//     console.log('Headers:', req.headers['content-type']); // Check for multipart/form-data
//     next();
// }, upload.single('image'), addProduct);