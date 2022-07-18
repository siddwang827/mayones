require('dotenv').config();
const mysql = require('mysql2/promise');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_CONNECTION_LIMIT } = process.env;


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sac10421',
    database: 'mayones',
});



// const pool = mysql.createPool({
//     host: DB_HOST,
//     user: DB_USERNAME,
//     password: DB_PASSWORD,
//     database: DB_DATABASE,
//     connectionLimit: DB_CONNECTION_LIMIT,
//     waitForConnections: true,
//     queueLimit: 0
// });


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