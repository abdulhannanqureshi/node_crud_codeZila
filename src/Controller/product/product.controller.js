const jwt = require('jsonwebtoken');
const { getAllData, createData, getDetails, deleteData, updateData, getFilterData, getTotalRecordData } = require("../../Model/common/common.model");
const { deleteOldFiles } = require('../../helper/common.helper');
const { v4: uuidv4 } = require('uuid');

const getProduct = async (req, res) => {
    try {
        const data = await getFilterData('product', req.query)
        const [totalRecords] = await getTotalRecordData('product')

        res.status(200).json({
            success: true, message: 'Data Found Successfully',
            count: totalRecords?.total,
            currentPage: parseInt(req?.query?.page),
            totalPages: Math.ceil(totalRecords?.total / req?.query?.limit),
            data,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'There was an error', error: error.message });
    }
}

const addProduct = async (req, res) => {
    try {
        const id = uuidv4()
        // get user details from user and add id of user in product table
        let authorization = req.headers.authorization.split(' ')[1]
        let decoded = jwt.verify(authorization, process.env.JWT_SECRET);

        const data = await createData("product", { ...req.body, id, file: req.file.filename, createdUser: decoded?.id });

        if (id) {
            const getProductDetails = await getDetails('product', id)
            res.status(200).json({ success: true, message: 'Data Added Successfully', data: getProductDetails });
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

const getProductDetails = async (req, res) => {
    try {
        let checkProduct = await getDetails("product", req.params.id)
        if (!checkProduct?.length) return res.status(400).json({ success: true, message: 'Invalid Product Id', });
        res.status(200).json({ success: true, message: 'Data Found Successfully', data: checkProduct });

    } catch (error) {
        res.status(500).json({ success: false, message: 'There was an error', error: error.message });
    }
}


const updateProduct = async (req, res) => {
    try {
        let checkProductId = await getDetails("product", req.params.id)
        if (!checkProductId?.length) return res.status(400).json({ success: true, message: 'Invalid Product Id', });

        // token verify ho gya hai but token mese user details nikalte hai taki 
        // kisne add or update or delte kiya hai
        // get user details from user and add id of user in product table
        let authorization = req.headers.authorization.split(' ')[1]
        let decoded = jwt.verify(authorization, process.env.JWT_SECRET);

        console.log(req?.file?.path);

        const deleteFileDat = deleteOldFiles(req?.file?.path)

        const data = await updateData("product", { ...req.body, file: req.file.filename, createdUser: decoded?.id }, req.params.id);
        const getProductDetails = await getDetails('product', req.params.id)
        res.status(200).json({ success: true, message: 'Data Added Successfully', data: getProductDetails });

    } catch (error) {
        res.status(500).json({ success: false, message: 'There was an error', error: error.message });
    }
}

module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
    getProductDetails,
    updateProduct
}