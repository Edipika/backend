const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addCategory, UpdateCategory, deleteCategory, showCategories, } = require('../controllers/categoryController');
const verifyJWT = require('../middleware/verifyJWT');

// Define the POST route for adding a category
router.post('/add',verifyJWT, upload.single('image'), addCategory);
router.post('/edit',verifyJWT, upload.single('image'), UpdateCategory);
router.delete('/delete/:id',verifyJWT, deleteCategory);
router.get('/show', showCategories);

module.exports = router; // Export the router


