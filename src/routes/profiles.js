const express = require('express');
const { readFileAsync } = require('../utils/fileHelper');
const path = require('path');

const router = express.Router();
const profilesPath = path.join(__dirname, '../data/players.json');

// دریافت تمامی پروفایل‌ها
router.get('/', async (req, res) => {
    try {
        const data = await readFileAsync(profilesPath);
        res.json(data.players);
    } catch (error) {
        console.error('Error reading profiles:', error);
        res.status(500).json({ error: 'Failed to load profiles.' });
    }
});

// دریافت امتیاز بازیکن
router.get('/:username', async (req, res) => {
    try {
        const data = await readFileAsync(profilesPath);
        const profiles = data.players; // مقداردهی پروفایل‌ها از فایل
        const { username } = req.params;
        const profile = profiles.find(profile => profile.username === username);

        if (profile) {
            res.json({ score: profile.score });
        } else {
            res.status(404).send('بازیکن پیدا نشد.');
        }
    } catch (error) {
        console.error('Error reading profiles:', error);
        res.status(500).json({ error: 'Failed to load profile.' });
    }
});

module.exports = router;
