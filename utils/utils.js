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


module.exports = {
    asyncHandlerWrapper,
    rateLimiterRoute
}