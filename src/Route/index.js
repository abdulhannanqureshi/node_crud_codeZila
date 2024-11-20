const express = require('express')
const router = express.Router()

const authRoute = require('./auth/auth.route')
const productRoute = require('./product/product.route')

router.use('/auth', authRoute)
router.use('/product', productRoute)

module.exports = router