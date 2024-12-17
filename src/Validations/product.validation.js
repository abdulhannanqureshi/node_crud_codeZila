const JOI = require('joi');

// Validation middle ware 

const ValidationProductSchema = (req, res, next) => {
    const { error } = JOI.object({
        title: JOI.string().required().messages({
            'string.base': 'Title should be a string.',
            'string.empty': 'Title cannot be empty.',
            'string.min': 'Title should have at least 3 characters.',
            'any.required': 'Title is a required field.'
        }),
        price: JOI.alternatives()
            .try(
                JOI.number().positive().strict(),  // Allow positive number
                JOI.string().pattern(/^\d+(\.\d+)?$/).custom((value, helper) => { // Allow numeric strings
                    const parsedValue = parseFloat(value);
                    if (isNaN(parsedValue) || parsedValue <= 0) {
                        return helper.message('Price must be a valid positive number.');
                    }
                    return parsedValue; // Return the valid parsed number
                })
            )
            .required()
            .messages({
                'any.required': 'Price is required.',
                'string.pattern.base': 'Price must be a valid number string.',
                'number.base': 'Price must be a valid number.',
                'number.positive': 'Price must be a positive number.'
            }),
        category_id: JOI.string().required(),
        file: JOI.object().optional(),
        description: JOI.string().optional(),
    }).validate(req.body)


    if (error) {
        return res.status(400).json({ message: error.message, details: error.details })
    }
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validFileTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, and GIF are allowed.' });
    }

    // 5 mb size limit
    if (req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ message: 'File size exceeds 5MB.' });
    }
    next()
}

module.exports = { ValidationProductSchema }