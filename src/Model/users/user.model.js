const { runSQLQuery } = require("../../helper/common.helper");


const isEmailDuplicate = async (email) => {
    const query = `SELECT * FROM user WHERE email = '${email}'`;
    return await runSQLQuery(query)
}

const createUser = async (bodyData) => {
    const query = `INSERT INTO user (name, email, password, dob, mobile_number) VALUES ('${bodyData.name}', '${bodyData.email}', '${bodyData.password}', '${bodyData.dob}','${bodyData.mobile_number}')`;
    return await runSQLQuery(query)
}

const getUserDetails = async (id) => {
    const query = `SELECT * FROM user WHERE id = '${id}'`;
    return await runSQLQuery(query)
}

module.exports = {
    isEmailDuplicate,
    createUser,
    getUserDetails
}