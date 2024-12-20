const express = require('express');
const fs = require("fs");
const path = require('path');

const router = express.Router();
const pathToJson = path.join(__dirname, '../data/Categories.json');

// Helper functions to read and write JSON files
const {readFileAsync} = require("../utils/fileHelper");
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

//routes for CRUD operations

// Create - add a category
router.post('/add', async (req, res) => {
    const newCategory = {
        categoryName: req.body.categoryName
    };
    try {
        const allCategories = await readFileAsync(pathToJson);

        // Check if category already exists
        const exists = allCategories.categories.some(
            category => category.categoryName === newCategory.categoryName
        );

        if (exists) {
            return res.status(409).json({ message: `.${newCategory.categoryName} وجود دارد` });
        }

        // Append the new category to the existing array
        allCategories.categories.push(newCategory);

        // Save everything back to the JSON file
        writeJSON(pathToJson, allCategories);

        res.status(201).json({message: `${newCategory.categoryName} با موفقیت اضافه شد.`});
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({message: "اضافه کردن دسته بندی انجام نشد."});
    }
});

// Read - get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await readFileAsync(pathToJson);
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error reading groups file:', error);
        res.status(500).json({ message: 'Failed to load categories.' });
    }
});

module.exports = router;

