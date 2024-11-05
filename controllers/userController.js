import { getUserData, addUser } from '../services/userService.js';
import { validateUsername, validateEmail } from '../helpers/userValidation.js';
import { db } from '../config/db.js';

// Handler to add a new user
export async function addUserHandler(req, res) {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
    }

    // Input validation
    if (!validateUsername(username)) {
      return res.status(400).json('Invalid username. It must be alphanumeric (_ is allowed).');
    }

    if (!validateEmail(email)) {
      return res.status(400).json('Invalid email format.');
    }

    // Sanitize inputs
    const sanitizedUsername = username.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedEmail = email.trim().toLowerCase();

    try {
        // Check if the email already exists in the database
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [sanitizedEmail]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        // Adding the user
        const userId = await addUser(sanitizedUsername, sanitizedEmail);
        res.status(201).json({ message: 'User added', userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Handler to get user data
export async function getUserDataHandler(req, res) {
    const userId = req.params.id;

    // Convert to a number and ensure it's an integer
    const sanitizedId = parseInt(userId, 10);
  
    // Check if the sanitized ID is a valid integer and is greater than 0
    if (isNaN(sanitizedId) || sanitizedId <= 0) {
        return res.status(400).json({ error: 'Invalid User ID.' });
    }

    try {
        const userData = await getUserData(userId);
        res.json(userData);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
