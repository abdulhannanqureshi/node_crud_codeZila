const express = require('express')
const { ValidationSignupSchema, validateLoginSchema } = require('../../Validations/user.validation')
const { signup, login } = require('../../Controller/users/users.controller')
const router = express.Router()

router.post('/sign-up', ValidationSignupSchema, signup)
router.get('/login', validateLoginSchema, login)

module.exports = router
