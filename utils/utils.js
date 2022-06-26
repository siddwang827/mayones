require('dotenv').config();

const multer = require('multer');
const port = process.env.PORT;
const { TOKEN_SECRET, PORT } = process.env; // 30 days by seconds
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const asyncHandlerWrapper = (fn) => {
    return function (req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
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
            res.status(result.status).send(result.message);
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
module.exports = {
    asyncHandlerWrapper,
    rateLimiterRoute,
    thoundsAddComma
}