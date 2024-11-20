const { getAllData } = require("../../Model/common/common.model");


const getProduct = async (req, res) => {
    try {
        const data = await getAllData('product')
        res.status(200).json({ success: true, message: 'Data Found Successfully', data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'There was an error', error: error.message });
    }
}

module.exports = { getProduct }