const express = require('express');
const { readFileAsync } = require('../utils/fileHelper');
const path = require('path');

const router = express.Router();
const profilesPath = path.join(__dirname, '../data/players.json');

router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const data = await readFileAsync(profilesPath);
        const player = data.players.find((p) => p.username === username);
        if (!player) {
            return res.status(404).json({ error: 'Player not found.' });
        }
        res.json(player);
    } catch (error) {
        console.error('Error reading profiles:', error);
        res.status(500).json({ error: 'Failed to load profiles.' });
    }
});

module.exports = router;
