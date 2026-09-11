const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(express.json());

// Serve all frontend files directly
app.use(express.static(path.join(__dirname, '../frontend')));

// Helper: Read users from JSON file
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
};

// Helper: Write users to JSON file
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// POST /api/register - Account Creation Endpoint
app.post('/api/register', (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const users = readUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Account already exists with this email.' });
    }

    const newUser = { id: Date.now(), fullName, email: email.toLowerCase(), password };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ success: true, user: { fullName: newUser.fullName, email: newUser.email } });
});

// POST /api/login - Authentication Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const users = readUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    res.json({ success: true, user: { fullName: user.fullName, email: user.email } });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});