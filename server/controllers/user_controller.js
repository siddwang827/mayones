const { User } = require("../models/user_model");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = process.env;
const TOKEN_EXPIRE_TIME = parseInt(process.env.TOKEN_EXPIRE_TIME);
const bcrypt = require("bcrypt");

const getSignUpPage = async (req, res) => {
    const header = { role: req.path.split("/")[1] };
    switch (header.role) {
        case "employer":
            res.render("employerSignup", { header });
            break;
        case "employee":
            res.render("signup", { header });
            break;
    }
};

const getSignInPage = async (req, res) => {
    const header = { role: req.path.split("/")[1] };

    switch (header.role) {
        case "employer":
            res.render("employerSignin", { header });
            break;
        case "employee":
            res.render("signin", { header });
            break;
    }
};

const signUp = async (req, res) => {
    const { username, role, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ error: "Lack of necessary information!" });
        return;
    }

    if (username.length > 20) {
        res.status(403).json({ error: "Username too long!" });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).json({ error: "Invalid email format!" });
        return;
    }

    try {
        const result = await User.createUser(email, password, role, username);

        const id = result.insertId;

        const accessToken = jwt.sign({ id, username, email, role }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRE_TIME });

        res.cookie("Authorization", `${accessToken}`);
        res.status(200).send({
            data: {
                access_token: accessToken,
                tokenExpireTime: TOKEN_EXPIRE_TIME,
                id,
                username,
                email,
                role,
            },
        });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(403).json({ error: "Email has already signed up!" });
        }
        console.log(err);
        res.status(500).json({ error: "Database Query Error!" });
    }
};

const signIn = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Lack of necessary information!" });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).json({ error: "Invalid email format!" });
        return;
    }

    try {
        const user = await User.signIn(email, password, role);

        if (!user) {
            return res.status(403).json({ error: "Email is not exist!" });
        }

        const compareResult = bcrypt.compareSync(password, user.password);

        if (!compareResult) {
            return res.status(403).json({ error: "Wrong password!" });
        }
        const accessToken = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            TOKEN_SECRET,
            { expiresIn: TOKEN_EXPIRE_TIME }
        );

        user.accessToken = accessToken;

        res.cookie("Authorization", `${user.accessToken}`);
        return res.status(200).json({
            data: {
                access_token: user.accessToken,
                tokenExpireTime: TOKEN_EXPIRE_TIME,
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Database Query Error!" });
    }
};


const logOut = async (req, res) => {
    res.clearCookie("Authorization", { path: "/" });
    res.status(200).json({ result: "Log out sucess" });
    return;
};

module.exports = {
    getSignUpPage,
    getSignInPage,
    signIn,
    signUp,
    logOut,

};
