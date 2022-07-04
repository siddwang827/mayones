const User = require('../models/user_model');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env
const TOKEN_EXPIRE_TIME = parseInt(process.env.TOKEN_EXPIRE_TIME)



const getSignUpPage = async (req, res) => {
    const header = { role: req.path.split('/')[1] }
    res.render('signup', { header })
}

const getSignInPage = async (req, res) => {
    const header = { role: req.path.split('/')[1] }
    res.render('signin', { header })
}

const signUp = async (req, res) => {
    const { username, role, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400).json({ error: 'Error: Lack of necessary information.' });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).json({ error: 'Error: Invalid email format.' });
        return;
    }

    try {
        const user = await User.createUser(email, password, role, username)


        res.cookie('Authorization', `${user.accessToken}`)
        res.status(200).send({
            data: {
                access_token: user.accessToken,
                TOKEN_EXPIRE_TIME,
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
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
        const result = await User.signIn(email, password, role)

        if (result.error) {
            const status_code = result.status ? result.status : 403;
            res.status(status_code).send({ error: result.error });
            return;
        }
        const user = result.user

        if (!user) {
            res.status(500).json({ error: 'Error: Database Query Error' })
            return;
        }
        res.cookie('Authorization', `${user.accessToken}`)
        res.status(200).json({
            data: {
                access_token: user.accessToken,
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

const logout = async (req, res) => {
    const user = req.user;
    res.status(200).clearCookie('Authorization', { path: "/" })
    res.redirect('/api/1.0/jobs')

}


module.exports = {
    getSignUpPage,
    getSignInPage,
    signIn,
    signUp,
    logout
}