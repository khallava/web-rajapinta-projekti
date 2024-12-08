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

// Palvelimen käynnistys
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});