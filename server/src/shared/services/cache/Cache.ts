import { RedisClient } from "redis";
import { ICache } from "./ICache";

//eslint-disable-next-line
const uuid = require("uuid");

export const uuidGenerator = uuid.v4;

export class Cache implements ICache {
  private redis_client: RedisClient;

  constructor(redis_client: any) {
    this.redis_client = redis_client;
  }

  cacheVerificationEmail(
    verificationType: "REGISTER" | "FORGOT_PASSWORD",
    data: Record<"email" & "redirectURL", string>,
    expireTime: number
  ): Promise<any> {
    const cacheId = uuidGenerator();
    const redisKey = `${verificationType}_EMAIL_${cacheId}`;
    this.cacheData(redisKey, data, expireTime);
    return cacheId;
  }

  deleteByPattern = async (pattern: string) => {
    const deletedKeys = await this.keys(pattern);
    const deletePromises = [];
    for (const deletedKey of deletedKeys) {
      deletePromises.push(this.redis_client.del(deletedKey));
    }

    return Promise.all(deletedKeys);
  };

  getCachedRegisterEmail = async (
    verificationType: "REGISTER" | "FORGOT_PASSWORD",
    key: string
  ): Promise<any> => {
    const cachedKey = `${verificationType}_EMAIL_${key}`;
    return this.redis_client.get(cachedKey);
  };

  cacheData = async (
    key: string,
    data: Record<string, any>,
    expireTime: number = 60 * 60 * 24
  ): Promise<void> => {
    await this.redis_client.set(key, JSON.stringify(data));
    await this.redis_client.expire(key, expireTime);
  };

  retrieveValue = async (key: string): Promise<any> => {
    return await this.redis_client.get(key);
  };

  keys = async (pattern: string): Promise<any> => {
    return await this.redis_client.keys(pattern);
  };
}
