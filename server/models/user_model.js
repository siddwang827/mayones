const { queryDB } = require('./mysql_conn.js')

class User {
    constructor(username, email, password, role) {
        this.username = username
        this.email = email
        this.password = password
        this.role = role
    }

    async createUser(userProfile) {
        const sql = `
        INSERT INTO user (username, email, password, role) 
        VALUES (?, ?, ?, ?)
        `
        const result = await queryDB(sql, Object.values(this))
        return result

    }
}
