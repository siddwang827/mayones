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
        const hash = bcrypt.hashSync(password, SALT_ROUND)
        const result = await queryDB(sql, [username, email, hash, USER_ROLE[role]])
        return result
    }

    static async signIn(email, password) {
        try {
            const [user] = await queryDB('SELECT users.id , username, email, password, role.name AS role FROM mayones.users  INNER JOIN mayones.role ON users.role_id = role.id WHERE email =? ', [email]);
            const compareResult = bcrypt.compareSync(password, user.password)
            if (!compareResult) {
                return { error: 'Wrong password!', status: 400 }
            }
            const accessToken = jwt.sign({
                username: user.username,
                email: user.email,
                role: user.role
            }, TOKEN_SECRET,
                { expiresIn: TOKEN_EXPIRE_TIME });

            user.access_token = accessToken;

            return { user };
        } catch (error) {
            return { error };
        }
    }
}

module.exports = User