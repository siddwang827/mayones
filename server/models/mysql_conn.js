require('dotenv').config();
const mysql = require('mysql2/promise');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_DATABASE_TEST, DB_CONNECTION_LIMIT } = process.env;
const env = process.env.NODE_ENV || 'production'

const mysqlConfig = {
    production: { // for EC2 machine
        host: DB_HOST,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE
    },
    development: { // for localhost development
        host: DB_HOST,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE
    },
    test: { // for automation testing (command: npm run test_windows)
        host: DB_HOST,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE_TEST
    }
};

let mysqlEnv = mysqlConfig[env];
mysqlEnv.waitForConnections = true;
mysqlEnv.connectionLimit = DB_CONNECTION_LIMIT;



const pool = mysql.createPool(mysqlEnv);


async function queryDB(sql, params) {
    try {
        const [result] = await pool.query(sql, params)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    pool,
    queryDB
};