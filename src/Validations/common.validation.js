const JOI = require('joi');
const validateIdSchema = (req, res, next) => {
    const { error } = JOI.object({
        id: JOI.number().required()
    }).validate(req.params);

    if (error) {
        return res.status(400).json({ message: error.message, details: error.details });
    }
    next();
};

module.exports = { validateIdSchema }