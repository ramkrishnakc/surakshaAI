export const REDIS_KEYS = {
  usertoken: 'user:token:',
};

export const REDIS_MAX_RETRY_DURATION = 5 * 60 * 1000; // 5 minutes is enough for the redis server to restart

export type RedisRetryStrategyType = {
  delay: number | null;
  retryDuration: number;
};

export const REDIS_TTL = {
  DEFAULT: 60, // default ttl is 1 minute
  ACCESS_TOKEN: 60 * 60, // set access token for user in Redis for 1hr
};
