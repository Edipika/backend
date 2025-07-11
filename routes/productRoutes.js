const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const verifyJWT = require('../middleware/verifyJWT');
const { addProduct, updateProduct, deleteProduct, showproducts,getProductByCategory,getProduct } = require('../controllers/productController'); 

// Define the POST route for adding a product
router.post('/add',verifyJWT,upload.single('image'), addProduct);
router.post('/edit',verifyJWT, upload.single('image'), updateProduct);
router.delete('/delete/:productId',verifyJWT, deleteProduct);
router.get('/show', showproducts);
router.get('/getByCategory/:categoryId', getProductByCategory);
router.get('/getProduct/:productId', getProduct);


module.exports = router; // Export the router

// router.post('/add', (req, res, next) => {
//     console.log('Headers:', req.headers['content-type']); // Check for multipart/form-data
//     next();
// }, upload.single('image'), addProduct);