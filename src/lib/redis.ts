import Redis from "ioredis";

let redisClient: Redis;

if (process.env.REDIS_URL) {
  redisClient = new Redis(process.env.REDIS_URL);
} else {
  // Fallback for local development
  redisClient = new Redis({
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
  });
}

export const redis = {
  async set(key: string, value: string, expiry: number): Promise<void> {
    await redisClient.set(key, value, "EX", expiry);
  },
  async get(key: string): Promise<string | null> {
    return redisClient.get(key);
  },
  async del(key: string): Promise<void> {
    await redisClient.del(key);
  },
  async exists(key: string): Promise<boolean> {
    return (await redisClient.exists(key)) === 1;
  },
};
