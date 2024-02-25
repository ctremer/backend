const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const AdminController = require('../controller/adminController');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/admin-signup', AdminController.signup);

module.exports = router;