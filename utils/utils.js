require('dotenv').config();

const multer = require('multer');
const port = process.env.PORT;
const User = require('../server/models/user_model');
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



module.exports = {
    asyncHandlerWrapper
}