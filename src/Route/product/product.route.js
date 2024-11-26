const express = require('express')
const { verifyToken } = require('../../middleware/verify.token.middleware')
const { getProduct, addProduct } = require('../../Controller/product/product.controller')
const { ValidationProductSchema } = require('../../Validations/product.validation')
const { uploadImage } = require('../../middleware/upload.middleware')

const router = express.Router()

router.get('/list', verifyToken, getProduct)
router.post('/add', verifyToken, uploadImage.single('file'), ValidationProductSchema, addProduct)

module.exports = router
