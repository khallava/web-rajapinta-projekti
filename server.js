const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Käyttäjälista
let users = [];

// GET: Palautetaan kaikki käyttäjät
app.get('/api/v1/user', (req, res) => {
    res.json(users);
});

// POST: Lisätään uusi käyttäjä
app.post('/api/v1/user', (req, res) => {
    const newUser = req.body;
    if (!newUser.username || !newUser.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    newUser.id = users.length + 1; // yksinkertainen ID
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT: Päivitetään olemassa olevan käyttäjän tiedot
app.put('/api/v1/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = req.body;
    if (!updatedUser.username || !updatedUser.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Päivitetään käyttäjä
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    res.json(users[userIndex]);
});

// DELETE: Poistetaan käyttäjä
app.delete('/api/v1/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Poistetaan käyttäjä
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted successfully' });
});

// Virheiden hallinta: 404 - Not Found
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Palvelimen käynnistys
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});