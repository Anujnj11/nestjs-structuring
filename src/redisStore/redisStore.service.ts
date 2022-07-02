import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ExpiryMode } from './redisStore.types';

@Injectable()
export default class RedisStoreService {
  private readonly client: ReturnType<RedisService['getClient']>;

  constructor(private readonly redisService: RedisService) {
    this.client = redisService.getClient();
  }

  /**
   * Set primitive values like string or number
   * @param {string} key - key to be set
   * @param {string} value - value for the key
   * @param {ExpiryMode} expiryMode - type of expiry
   * @returns {Promise} boolean value representing if the key is set or not
   */
  async set(
    key: string,
    value: string,
    expiryMode?: ExpiryMode,
    expiry?: number,
  ): Promise<boolean> {
    const isSet = !!(await this.client.set(key, value));

    if (isSet) {
      switch (expiryMode) {
        case ExpiryMode.seconds:
          await this.client.expire(key, expiry);
          break;
        case ExpiryMode.milliseconds:
          await this.client.pexpire(key, expiry);
          break;
        case ExpiryMode['timestamp-seconds']:
          await this.client.expireat(key, expiry);
          break;
        case ExpiryMode['timestamp-milliseconds']:
          await this.client.pexpireat(key, expiry);
      }
    }

    return isSet;
  }

  /**
   * Get string value by key
   * @param key - key whose value to be fetched
   * @returns {string} value for the key
   */
  async get(key: string): Promise<string> {
    const accessToken = await this.client.get(key);
    return accessToken;
  }

  /**
   * setData generic set method for set key value pair in redis
   * @param key - key to be set
   * @param args - value for the key
   * @param expiry - number of seconds after which to expire
   * @returns {Promise} boolean value if the key is set or not
   */
  async setData(key: string, args: any, expiry?: number): Promise<boolean> {
    const isSet: string = await this.client.hmset(key, args);
    if (expiry != null) {
      this.client.expire(key, expiry);
    }
    return !!isSet;
  }

  /**
   * getData - fetch the corresponding field value for the given key
   * @param key
   * @param field
   * @returns {Promise} Promise string of the values stored in redis
   */
  async getData(key: string, field: string): Promise<string> {
    const data = await this.client.hmget(key, field);
    return data[0];
  }
}
