const express = require('express');
const { readFileAsync } = require('../utils/fileHelper');
const path = require('path');

const router = express.Router();
const answeredQuestionsPath = path.join(__dirname, '../data/AnsweredQuestions.json');

router.get('/', async (req, res) => {
    try {
        const data = await readFileAsync(answeredQuestionsPath);
        res.json(data.answeredQuestions);
    } catch (error) {
        console.error('Error reading answered questions:', error);
        res.status(500).json({ error: 'Failed to load answered questions.' });
    }
});

module.exports = router;
