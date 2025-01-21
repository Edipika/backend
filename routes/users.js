const express = require('express');
const router = express.Router();
const {getUsers,getAdmins} = require('../controllers/usersController');

router.get('/user', getUsers);
router.get('/admins', getAdmins);


module.exports = router;