const express = require('express');
const { readFileAsync } = require('../utils/fileHelper');
const path = require('path');

const router = express.Router();
const questionsPath = path.join(__dirname, '../data/ExistingQuestions.json');

router.get('/', async (req, res) => {
    try {
        const data = await readFileAsync(questionsPath);
        res.json(data.questions);
    } catch (error) {
        console.error('Error reading questions:', error);
        res.status(500).json({ error: 'Failed to load questions.' });
    }
});

module.exports = router;
