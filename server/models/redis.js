const Redis = require("redis");
const { REDIS_USER, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;

const redisClient = Redis.createClient({
    url: `redis://${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
    socket: {
        keepAlive: false,
    },
});

redisClient.ready = false;

redisClient.on("ready", () => {
    redisClient.ready = true;
    console.log("Redis is ready");
});

redisClient.on("error", (err) => {
    redisClient.ready = false;
    if (process.env.NODE_ENV == "production") {
        console.log("Error in Redis");
    }
});

redisClient.connect();

module.exports = redisClient;
