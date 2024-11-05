import { createClient } from 'redis';

// Create and initialize the Redis client
const redis = createClient({
  url: 'redis://localhost:6379' // Default params, redis[s]://[[username][:password]@][host][:port][/db-number]
});

try {
  await redis.connect(); // Await the connection
  console.log('Connected to Redis successfully!');
} catch (error) {
  console.error('Failed to connect to Redis:', error);
}

export { redis };