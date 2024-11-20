const { runSQLQuery } = require("../../helper/common.helper");


const getAllData = async (tableName) => {
    const query = `SELECT * FROM ${tableName}`;
    return await runSQLQuery(query)
}

module.exports = {
    getAllData,
}