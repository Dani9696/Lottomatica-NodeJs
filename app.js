import express from 'express';
import { addUserHandler, getUserDataHandler } from './controllers/userController.js';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.post('/users', addUserHandler);
app.get('/users/:id', getUserDataHandler);

// 404 Middleware: Catch all undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
