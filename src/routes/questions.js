const express = require('express');
const fs = require("fs");
const path = require('path');

const router = express.Router();
const pathToJson = path.join(__dirname, '../data/Questions.json');

// Helper functions to read and write JSON files
const {readFileAsync} = require("../utils/fileHelper");
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// routes for CRUD operations

// Create - add a tarrah
router.post('/add', async (req, res) => {
    const allQuestions = await readFileAsync(pathToJson);
    const newQuestion = {
        id: allQuestions.questions.length + 1,
        category: req.body.category,
        text: req.body.text,
        choices: req.body.choices,
        correctChoice: req.body.correctChoice - 1,
        difficulty: req.body.difficulty,
        tarrahName: req.body.tarrahName
    };
    try {
        // Append the new question to the existing array
        allQuestions.questions.push(newQuestion);

        // Save everything back to the JSON file
        writeJSON(pathToJson, allQuestions);

        res.status(201).json({message: `${newQuestion.text} added to questions successfully.`});
    } catch (error) {
        res.status(500).json({message: "Failed to add new question."});
    }
});

// Read - get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await readFileAsync(pathToJson);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({message: "Failed reading Questions.json"})
    }
});

// Read - get all questions of a specific category and difficulty
router.get('/:category', async (req, res) => {
    const allQuestions = await readFileAsync(pathToJson);
    const selectedQuestions = allQuestions.questions.filter(t => t.category === req.params.category);
    if (selectedQuestions.length === 0) {
        return res.status(404).json({message: "No questions found"})
    }
    res.json(selectedQuestions)
});

// Update and Delete - nothing for now

module.exports = router;
