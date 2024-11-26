const multer = require('multer');

const imagesPath = './src/public/images/'
const pdfPath = './src/public/pdf/'

// Create Multer storage 
// Isme 2 chij hoti hai destination and filename
// ak storage image k liye hai 
const imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        // console.log("imagesPath", imagesPath, file)
        callback(null, imagesPath)
    },
    filename: (req, file, callback) => {
        // console.log("imagesPath", imagesPath, file)
        callback(null, `profile_${new Date().getDate()}_${file.originalname}`);
    }
});

const pdfStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, pdfPath)
    },
    filename: (req, file, callback) => {
        callback(null, `profile_${new Date().getDate()}_${file.originalname}`)
    }
});

const uploadImage = multer({
    storage: imageStorage
})

const uploadPDF = multer({
    storage: pdfStorage
})

module.exports = {
    uploadImage,
    uploadPDF
};