const mysql = require('mysql2/promise');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_DATABASE_TEST } = process.env;

const mysqlConfig = {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
}


const pool = mysql.createPool(mysqlConfig, false);


pool.getConnection((err, conn) => {
    try {
        console.log("Mysql is connected");
        pool.releaseConnection(conn);
    } catch (err) {
        console.log(err)
    }
})

module.exports = {
    mysql,
    pool
};