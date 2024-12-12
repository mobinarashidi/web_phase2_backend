const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Load JSON data
const loadJSONFile = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Save JSON data
const saveJSONFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const playersFilePath = path.join(__dirname, '../data/players.json');
const tarrahsFilePath = path.join(__dirname, '../data/tarrahs.json');

let players = loadJSONFile(playersFilePath);
let tarrahs = loadJSONFile(tarrahsFilePath);

// Login route for players and designers
router.post('/login', (req, res) => {
    const { role, username, password } = req.body;
    const userList = role === 'player' ? players.players : tarrahs.tarrahs;

    const user = userList.find(user => user.username === username);
    if (!user) {
        return res.status(404).send('User not found. Please register.');
    }
    if (user.password !== password) {
        return res.status(401).send('Incorrect password.');
    }
    res.status(200).send('Login successful');
});

// Register route for players and designers
router.post('/register', (req, res) => {
    const { role, username, password, name, email, ...rest } = req.body;
    const userList = role === 'player' ? players.players : tarrahs.tarrahs;

    const userExists = userList.find(user => user.username === username || user.email === email);
    if (userExists) {
        return res.status(409).send('Username or email already exists. Please login.');
    }

    const newUser = { username, password, name, email, ...rest };
    userList.push(newUser);

    // Save data back to the JSON file
    if (role === 'player') {
        saveJSONFile(playersFilePath, { players: userList });
    } else {
        saveJSONFile(tarrahsFilePath, { tarrahs: userList });
    }

    res.status(201).send('User registered successfully');
});

module.exports = router;
