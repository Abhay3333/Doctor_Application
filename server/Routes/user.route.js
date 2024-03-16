const express = require('express');
const router = express.Router();
const {register,login,getUserId,applyDoctor} = require('../Controller/user.controller.js');
const authMiddleware = require('../Middleware/auth.middleware.js');

router.post('/register', register);
router.post('/login', login);
router.post('/get-user-by-id',authMiddleware, getUserId)
router.post('/apply-doctor-account',authMiddleware,applyDoctor)

module.exports = router;