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

const fileFilter = (req, file, cb,) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        // File type is valid, accept the file
        cb(null, true);
    } else {
        // File type is invalid, reject the file
        cb(new Error('Invalid file type. Only JPEG, PNG, JPG, and GIF files are allowed!'), false);
    }
};

const uploadImage = multer({
    storage: imageStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 1 * 1024 * 1024 }
})

const uploadPDF = multer({
    storage: pdfStorage
})

module.exports = {
    uploadImage,
    uploadPDF
};