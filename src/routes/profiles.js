const express = require('express');
const { readFileAsync } = require('../utils/fileHelper');
const path = require('path');

const router = express.Router();
const profilesPath = path.join(__dirname, '../data/players.json');

router.get('/', async (req, res) => {
    try {
        const data = await readFileAsync(profilesPath);
        res.json(data.players);
    } catch (error) {
        console.error('Error reading profiles:', error);
        res.status(500).json({ error: 'Failed to load profiles.' });
    }
});

module.exports = router;

