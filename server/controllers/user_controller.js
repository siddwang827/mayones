const User = require('../models/user_model');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env
const TOKEN_EXPIRE_TIME = parseInt(process.env.TOKEN_EXPIRE_TIME)
const SALT_ROUND = parseInt(process.env.SALT_ROUND)


const getSignUpPage = async (req, res) => {
    const header = req.path.split('/')[1]
    res.render('signup', { header })
}

const getSignInPage = async (req, res) => {
    const header = req.path.split('/')[1]
    res.render('signin', { header })
}

const signUp = async (req, res) => {
    const { username, role, email, password } = req.body
    console.log(username, email, password, role)
    if (!username || !email || !password) {
        res.status(400).json({ error: 'Error: Lack of necessary information.' });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).json({ error: 'Error: Invalid email format.' });
        return;
    }

    try {
        const result = await User.createUser(email, password, role, username)
        // const createResult = await user.createUser()
        let id = result.insertId
        const accessToken = jwt.sign(
            { id, username, email, role },
            TOKEN_SECRET,
            { expiresIn: TOKEN_EXPIRE_TIME }
        )

        res.status(200).send({
            data: {
                access_token: accessToken,
                TOKEN_EXPIRE_TIME,
                id,
                username,
                email,
                role
            }
        })
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(403).json({ error: 'Error: Email has already signed up!' })
        }
        console.log(err)
        res.status(500).json({ error: 'Error: Database Query Error' })
    }
}

const signIn = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) { res.status(400).json({ error: 'Lack of necessary information!' }); return }

    try {
        const user = await User.signIn(email, password)

        if (user.error) {
            res.status(user.status).json({ error: user.error })
            return
        }
        res.status(200).json({
            data: {
                accessToken: user.accessToken,
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    getSignUpPage,
    getSignInPage,
    signIn,
    signUp,
}