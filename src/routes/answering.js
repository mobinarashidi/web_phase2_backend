const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const questionsFilePath = path.join(__dirname, '../data/questions.json');
let questions = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));

// دریافت سوال تصادفی
router.get('/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * questions.questions.length);
    const randomQuestion = questions.questions[randomIndex];
    res.json(randomQuestion);
});

// دریافت سوال بر اساس دسته‌بندی
router.get('/category/:category', (req, res) => {
    const category = req.params.category;
    const filteredQuestions = questions.questions.filter(q => q.category === category);

    if (filteredQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
        const randomQuestion = filteredQuestions[randomIndex];
        res.json(randomQuestion);
    } else {
        res.status(404).send('سوالی در این دسته‌بندی یافت نشد.');
    }
});

module.exports = router;
