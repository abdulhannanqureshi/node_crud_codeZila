const { getAllData, createData, getDetails } = require("../../Model/common/common.model");


const getProduct = async (req, res) => {
    try {
        const data = await getAllData('product')
        res.status(200).json({ success: true, message: 'Data Found Successfully', data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'There was an error', error: error.message });
    }
}

const addProduct = async (req, res) => {
    try {
        const data = await createData("product", { ...req.body, file: req.file.filename });
        if (data.insertId) {
            const getProductDetails = await getDetails('product', data.insertId)
            res.status(200).json({ success: true, message: 'Data Found Successfully', data: getProductDetails });
        } else {
            res.status(500).json({ success: false, message: 'There was an error', });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'There was an error', error: error.message });
    }
}

module.exports = {
    getProduct,
    addProduct
}