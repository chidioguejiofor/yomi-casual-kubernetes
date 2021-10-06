import redis from "async-redis";
import { Cache } from "./Cache";
// import {}
//eslint-disable-next-line
const uuid = require("uuid");

export const uuidGenerator = uuid.v4;
// const REDIS_CLIENT = redis.createClient(process.env.REDIS_SERVER_URL);

export const cache = new Cache({});
