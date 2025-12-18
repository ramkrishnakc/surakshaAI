import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { CustomLoggerService } from '../logger/logger.service';
import { REDIS_MAX_RETRY_DURATION, RedisRetryStrategyType } from './redis.constants';
import { LOG_CTXT } from 'src/common/constants';

const ctxt = LOG_CTXT.REDIS;
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis; // Reference to the client

  constructor(private readonly logger: CustomLoggerService) {}

  // Assume the client is initialized elsewhere, e.g., in onModuleInit or constructor
  async onModuleInit() {
    this.client = new Redis(this.connectionOptions());
    try {
      await this.client.connect();
      this.logger.log('Connected redis client!', ctxt);
    } catch (e) {
      this.logger.error('Failed to connect redis client.', e as Error, ctxt);
    }
  }

  redisRetryStrategy(times: number, totalRetryDuration: number): RedisRetryStrategyType {
    // Exponential backoff, cap at 30 seconds
    const delay = Math.min(1000 * 2 ** times, 30000);
    const currentRetryDuration = totalRetryDuration + delay;

    if (currentRetryDuration >= REDIS_MAX_RETRY_DURATION) {
      this.logger.error(
        'Stopping reconnection attempts. Max retry duration reached.',
        undefined,
        ctxt,
      );
      return { delay: null, retryDuration: currentRetryDuration };
    }

    this.logger.log(`Connection retry, attempt ${times}, waiting for ${delay}ms.`, ctxt);
    return { delay, retryDuration: currentRetryDuration };
  }

  connectionOptions(): RedisOptions {
    let totalRetryDuration = 0;

    return {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6739,
      password: process.env.REDIS_PASSWORD,
      showFriendlyErrorStack: true,
      lazyConnect: true,
      commandTimeout: 1000,
      retryStrategy: times => {
        const { delay, retryDuration } = this.redisRetryStrategy(times, totalRetryDuration);
        totalRetryDuration = retryDuration;
        return delay;
      },
    };
  }

  // Closes the Redis connection when the module is destroyed.
  async onModuleDestroy() {
    this.logger.log('Disconnecting redis client....', ctxt);
    await this.client.flushdb(); // Clear the Redis DB
    await this.client.quit(); // Use quit() for a graceful exit
    this.logger.log('Disconnected redis client!', ctxt);
  }

  // Set the key value pair cache in Redis
  async set(key: string, value: string, ttlInSeconds: number): Promise<void> {
    await this.client.set(key, value, 'EX', ttlInSeconds); // 'EX' sets an expiration time
  }

  // Get the value using key from Redis
  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  // Delete the key-value pair from Redis
  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }
}
