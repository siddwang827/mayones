const redisClient = require("../server/models/redis");
const Cache = require("../server/models/redis");

const rateLimiter = async (req, res, next) => {
    if (!Cache.ready) {
        return next();
    }

    try {
        const EXPIRATION = 1;
        const MAX_QUERY_TIMES = 20;
        const clientIP = req.socket.remoteAddress;
        const requestFrom = req.url;

        const requestTimes = await redisClient.multi().incr(clientIP).expire(clientIP, EXPIRATION).exec();
        if (requestTimes[0] > MAX_QUERY_TIMES) {
            return res.status(429).json("Frequently request");
        }
        // console.log(`${clientIP}  ${requestTimes[0]}  ${requestFrom}`);
        next();
    } catch (err) {
        res.status(500).json({ type: "rate limiter", message: err.message });
    }
};

module.exports = { rateLimiter };
