const { queryDB, pool } = require('./mysql_conn.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env
const TOKEN_EXPIRE_TIME = parseInt(process.env.TOKEN_EXPIRE_TIME)
const SALT_ROUND = parseInt(process.env.SALT_ROUND)

const USER_ROLE = {
    admin: 0,
    employee: 1,
    employer: 2
}

const AUTH = {
    required: true,
    nonRequired: false
}

class User {
    constructor(email, password, role, username) {
        this.username = username || null
        this.email = email
        this.password = password
        this.roleId = USER_ROLE[role]
    }

    static async createUser(email, password, role, username) {
        const sql = `
        INSERT INTO users (username, email, password, role_id) 
        VALUES (?, ?, ?, ?)
        `

        try {
            const hash = bcrypt.hashSync(password, SALT_ROUND)
            const result = await queryDB(sql, [username, email, hash, USER_ROLE[role]])
            const id = result.insertId

            const accessToken = jwt.sign(
                { id, username, email, role },
                TOKEN_SECRET,
                { expiresIn: TOKEN_EXPIRE_TIME }
            )
            const user = {
                accessToken: accessToken,
                id,
                username,
                email,
                role,
            }
            return user
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    static async signIn(email, password, role) {

        const sql = `
            SELECT users.id , username, email, password, role.name AS role 
            FROM mayones.users  
            INNER JOIN mayones.role 
            ON users.role_id = role.id 
            WHERE email = ? AND role_id = ?
            `
        try {
            const [user] = await queryDB(sql, [email, USER_ROLE[role]]);
            if (!user) {
                return { error: 'Email is not exisit!', status: 400 }
            }
            const compareResult = bcrypt.compareSync(password, user.password)
            if (!compareResult) {
                return { error: 'Wrong password!', status: 400 }
            }
            const accessToken = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }, TOKEN_SECRET,
                { expiresIn: TOKEN_EXPIRE_TIME });

            user.accessToken = accessToken;

            return { user };
        } catch (err) {
            console.log(err)
            return { err };
        }
    }

    static async getUserDetail(email) {
        const sql = `
        SELECT * FROM users WHERE email = ?
        `
        const [result] = await queryDB(sql, [email])
        return result

    }
}

module.exports = { User, AUTH }