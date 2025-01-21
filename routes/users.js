const express = require('express');
const router = express.Router();
const {getUsers,getAdmins} = require('../controllers/usersController');

router.get('/users', getUsers);
router.get('/admins', getAdmins);


module.exports = router;