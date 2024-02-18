const express = require('express');
const router = express.Router();
const {register,login,getUserId} = require('../Controller/user.controller.js');
const authMiddleware = require('../Middleware/auth.middleware.js');

router.post('/register', register);
router.post('/login', login);
router.post('/get-user-by-id',authMiddleware, getUserId)

module.exports = router;