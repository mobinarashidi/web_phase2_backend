const express = require('express');
const { readFileAsync } = require('../utils/fileHelper');
const path = require('path');

const router = express.Router();
const groupsPath = path.join(__dirname, '../data/ExistingGroups.json');

router.get('/', async (req, res) => {
    try {
        const data = await readFileAsync(groupsPath);
        res.json(data.groups);
    } catch (error) {
        console.error('Error reading groups file:', error);
        res.status(500).json({ error: 'Failed to load categories.' });
    }
});

module.exports = router;

