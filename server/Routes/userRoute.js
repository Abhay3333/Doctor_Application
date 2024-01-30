const express = require('express')
const {register,login, getUserId,applyDoctor} = require('../Controller/userController')
const authToken = require('../middleware/Authentication')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/get-user-by-id',authToken,getUserId)
router.post('apply-doctor-account',authToken,applyDoctor)


module.exports = router