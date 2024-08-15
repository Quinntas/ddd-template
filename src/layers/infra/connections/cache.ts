import {RedisAdapter} from "../adapters/redisAdapter";

export const cache = new RedisAdapter(process.env.REDIS_URI!)