const express = require('express')
const router = express.Router()

const authRoute = require('./auth/auth.route')
const userRoute = require('./user/user.route')

router.use('/auth', authRoute)
router.use('/', userRoute)

module.exports = router