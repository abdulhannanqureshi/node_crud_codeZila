const express = require('express')
const { verifyToken } = require('../../middleware/verify.token.middleware')
const { getProduct } = require('../../Controller/product/product.controller')

const router = express.Router()

router.get('/list', verifyToken, getProduct)

module.exports = router
