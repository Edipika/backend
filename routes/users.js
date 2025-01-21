const express = require('express');
const router = express.Router();
const { getUsers, getAdmins, deleteUsers } = require('../controllers/usersController');
const upload = require('../middleware/multer');

router.get('/users', getUsers);
router.get('/admins', getAdmins);
// router.post('/delete', deleteUsers);
router.delete('/delete/:userId', deleteUsers);


module.exports = router;