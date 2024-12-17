const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addCategory,UpdateCategory,deleteCategory,showCategories,GetCategory } = require('../controllers/category-controller'); 

// Define the POST route for adding a category
router.post('/add',  upload.single('image'),addCategory);
// router.post('/edit', UpdateCategory);
router.post('/get', GetCategory);
router.post('/delete', deleteCategory);
router.get('/show', showCategories);



module.exports = router; // Export the router


