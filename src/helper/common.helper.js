const jwt = require('jsonwebtoken');
const DB = require('../config/database');

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

module.exports = {
    runSQLQuery,
    generateToken
}