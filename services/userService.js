import { db } from '../config/db.js';
import { redis } from '../config/redisClient.js';

// Function to retrieve user data
export async function getUserData(userId) {
    try {
        const cachedData = await redis.get(`user:${userId}`);
        if (cachedData) {
            console.log('Data retrieved from Redis cache');
            return JSON.parse(cachedData);
        }

        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            throw new Error('User not found');
        }

        await redis.set(`user:${userId}`, JSON.stringify(rows[0]), {EX: 300});
        console.log('Data retrieved from MySQL and cached in Redis');
        return rows[0];
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Function to add a new user
export async function addUser(username, email) {
    try {
        const [result] = await db.execute('INSERT INTO users (username, email) VALUES (?, ?)', [username, email]);
        const userId = result.insertId;

        const userData = { id: userId, username, email, created_at: new Date() };
        await redis.set(`user:${userId}`, JSON.stringify(userData), {EX: 300});
        console.log('User added and cached in Redis');

        return userId;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}
