const jwt = require('jsonwebtoken');
const DB = require('../config/database');
const fs = require('fs');

const runSQLQuery = (query) => {
    return new Promise((resolve, reject) => {
        DB.query(query, (err, response) => {
            if (response) resolve(response);
            else reject(err);
        });
    })
}

const generateToken = (data, secret, expTime) => {
    return jwt.sign(data, secret, expTime);
}
const deleteOldFiles = (filePath) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('File does not exist');
        } else {
            fs.unlinkSync(filePath);
        }
    });
}

module.exports = {
    runSQLQuery,
    generateToken,
    deleteOldFiles
}