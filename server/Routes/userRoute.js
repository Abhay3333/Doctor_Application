const express = require('express')
const {register,login, getUserId} = require('../Controller/userController')
const authToken = require('../middleware/Authentication')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/get-user-by-id',authToken,getUserId)

module.exports = router