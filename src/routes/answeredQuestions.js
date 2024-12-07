const express = require('express');
const { readFileAsync } = require('../utils/fileHelper');
const path = require('path');

const router = express.Router();
const profilesPath = path.join(__dirname, '../data/players.json');

router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        // خواندن داده‌ها از فایل
        const data = await readFileAsync(profilesPath);
        const player = data.players.find((p) => p.username === username);

        // بررسی وجود بازیکن
        if (!player) {
            return res.status(404).json({ error: 'Player not found.' });
        }

        // ارسال پاسخ شامل سوالات پاسخ داده شده
        res.json({ answeredQuestions: player.answeredQuestions });
    } catch (error) {
        console.error('Error reading profiles:', error);
        res.status(500).json({ error: 'Failed to load profiles.' });
    }
});

module.exports = router;
