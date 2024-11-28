const { runSQLQuery } = require("../../helper/common.helper");


const getAllData = async (tableName) => {
    const query = `SELECT * FROM ${tableName}`;
    return await runSQLQuery(query)
}

const createData = async (tableName, bodyData) => {
    let query = `INSERT INTO ${tableName} (`;

    Object.keys(bodyData).forEach((key, index) => {
        if (index === (Object.keys(bodyData)?.length - 1)) {
            query = `${query}${key}`
            return
        }
        query = `${query}${key}, `
    })
    //column to thik hai  but value ko qoutes me dena hoga qk ye query me hai 

    Object.keys(bodyData).forEach((key, index) => {
        if (index === 0) query = `${query}) VALUES (`

        if (index === (Object.keys(bodyData)?.length - 1)) {
            query = `${query}'${bodyData[key]}')`
            return
        }
        query = `${query}'${bodyData[key]}', `
    })
    return await runSQLQuery(query)
}

const getDetails = async (tableName, id) => {
    const query = `SELECT * FROM ${tableName} WHERE id = '${id}'`;
    return await runSQLQuery(query)
}

const deleteData = async (tableName, id) => {
    const query = `DELETE FROM ${tableName} WHERE id = ${id}`;
    return await runSQLQuery(query)
}


module.exports = {
    getAllData,
    createData,
    getDetails,
    deleteData
}