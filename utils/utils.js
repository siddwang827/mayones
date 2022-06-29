require('dotenv').config();
const { TOKEN_SECRET, PORT } = process.env; // 30 days by seconds
const User = require('../server/models/user_model')
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncHandlerWrapper = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};

const rateLimiterRoute = async (req, res, next) => {
    if (!Cache.ready) {
        // Redis is not connected
        return next();
    }
    try {
        const token = req.ip;
        let result = await rateLimiter(token);
        if (result.status == 200) {
            return next();
        } else {
            res.status(result.status).json(result.message);
            return;
        }
    } catch (e) {
        return next();
    }
};

const thoundsAddComma = (value) => {
    if (value) {
        value += "";
        let arr = value.split(".");
        let re = /(\d{1,3})(?=(\d{3})+$)/g;

        return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
    }
    else { return '' }
}

const authentication = () => {
    return async function (req, res, next) {

        // use cookie for ejs authorization
        let accessToken = req.cookies.Authorization
        if (!accessToken) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        // user header jwt token
        // let accessToken = req.get('Authorization');
        // if (!accessToken) {
        //     res.status(401).json({ error: 'Unauthorized' });
        //     return;
        // }

        accessToken = accessToken.replace('Bearer ', '');
        if (accessToken == 'null') {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        try {
            const user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
            req.user = user;

            const userDetail = await User.getUserDetail(user.email);

            if (!userDetail) {
                res.status(403).json({ error: 'Forbidden' });
            } else {
                next()
            }
            return

        } catch (err) {
            console.log(err)
            res.status(403).json({ error: 'Forbidden' });
            return;
        }
    };
};



module.exports = {
    asyncHandlerWrapper,
    rateLimiterRoute,
    thoundsAddComma,
    authentication
}