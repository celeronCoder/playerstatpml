import Redis from "redis";

const REDIS_PORT =
    process.env.REDIS_PORT !== undefined ? process.env.REDIS_PORT : 4329;

const redisClient: Redis.RedisClient = Redis.createClient({
    port: parseInt(`${process.env.REDIS_PORT}`),
    host: process.env.REDIS_HOST,
});

export const DEFAULT_EXPIRATION = 12 * 3600;

export default redisClient;
