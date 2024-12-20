const express = require('express')
const { verifyToken } = require('../../middleware/verify.token.middleware')
const { getProduct, addProduct, deleteProduct, getProductDetails, updateProduct } = require('../../Controller/product/product.controller')
const { ValidationProductSchema } = require('../../Validations/product.validation')
const { uploadImage } = require('../../middleware/upload.middleware')
const { validateIdSchema } = require('../../Validations/common.validation')

const router = express.Router()

router.get('/list', verifyToken, getProduct)
router.post('/add', verifyToken, uploadImage.single('file'), ValidationProductSchema, addProduct)
router.delete('/delete/:id', verifyToken, validateIdSchema, deleteProduct)
router.get('/details/:id', verifyToken, getProductDetails)

// validation age isliye nahi chal rha hai qk ye form data me arha hai to validation req.body null milege 
// qk json nahi hai to isliye image validation usi me bnana hoge image se related

router.put('/update/:id', verifyToken, uploadImage.single('file'), ValidationProductSchema, updateProduct)

module.exports = router
