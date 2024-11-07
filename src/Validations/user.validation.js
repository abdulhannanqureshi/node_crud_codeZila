const JOI = require('joi');

// Validation middle ware 

const ValidationSignupSchema = (req, res, next) => {
    const { error } = JOI.object({
        name: JOI.string().required().messages({
            'string.base': 'Name should be a string.',
            'string.empty': 'Name cannot be empty.',
            'string.min': 'Name should have at least 3 characters.',
            'any.required': 'Name is a required field.'
        }),
        email: JOI.string().email().required(),
        password: JOI.string().required(),
        mobile_number: JOI.number(),
        dob: JOI.string(),
    }).validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.message, details: error.details })
    }
    next()
}


const validateLoginSchema = (req, res, next) => {
    const { error } = JOI.object({
        email: JOI.string().email().required(),
        password: JOI.string().required(),
    }).validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message, error: error, details: error.details });
    }
    next()
}

module.exports = { validateLoginSchema, ValidationSignupSchema }