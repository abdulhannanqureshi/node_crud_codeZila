const jwt = require('jsonwebtoken');
const { getAllData, createData, getDetails, deleteData } = require("../../Model/common/common.model");

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

        // get user details from user and add id of user in product table
        let authorization = req.headers.authorization.split(' ')[1]
        let decoded = jwt.verify(authorization, process.env.JWT_SECRET);

        const data = await createData("product", { ...req.body, file: req.file.filename, createdUser: decoded?.id });
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



const deleteProduct = async (req, res) => {
    try {
        if (req.params.id) {
            let checkProduct = await getDetails("product", req.params.id)

            if (!checkProduct?.length) return res.status(400).json({ success: true, message: 'Invalid Product Id', });

            let deleteResponse = await deleteData("product", req.params.id)
            res.status(200).json({ success: true, message: 'Product Delete Successfully', });
        } else {
            res.status(500).json({ success: false, message: 'There was an error. ID not Found', });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'There was an error', error: error.message });
    }
}

module.exports = {
    getProduct,
    addProduct,
    deleteProduct
}