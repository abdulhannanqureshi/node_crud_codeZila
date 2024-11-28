const express = require('express')
const { verifyToken } = require('../../middleware/verify.token.middleware')
const { getProduct, addProduct, deleteProduct } = require('../../Controller/product/product.controller')
const { ValidationProductSchema } = require('../../Validations/product.validation')
const { uploadImage } = require('../../middleware/upload.middleware')
const { validateIdSchema } = require('../../Validations/common.validation')

const router = express.Router()

router.get('/list', verifyToken, getProduct)
router.post('/add', verifyToken, uploadImage.single('file'), ValidationProductSchema, addProduct)
router.delete('/delete/:id', verifyToken, validateIdSchema, deleteProduct)

module.exports = router
