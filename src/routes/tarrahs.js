const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const pathToJson = path.join(__dirname, "../data/Tarrahs.json");

// helper functions to read and write json files
const {readFileAsync} = require("../utils/fileHelper");
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));


// routes for CRUD operations

// Create - add a tarrah
router.post('/add', async (req, res) => {
    const newTarrah = {
        username: req.body.username,
        password: req.body.password,
        followers: req.body.followers,
        questionCount: req.body.questionCount,
        gender: req.body.gender,
        email: req.body.email
    };
    try {
        const allTarrahs = await readFileAsync(pathToJson);

        // Check if the username already exists
        const nameExists = allTarrahs.tarrahs.some(
            tarrah => tarrah.username === newTarrah.username
        );

        if (nameExists) {
            return res.status(409).json({ message: `${newTarrah.username} already exists.` });
        }

        // Check if the email already exists
        const emailExists = allTarrahs.tarrahs.some(
            tarrah => tarrah.email === newTarrah.email
        );

        if (emailExists) {
            return res.status(409).json({ message: `${newTarrah.email} already has an account.` });
        }

        // Append the new tarrah to the existing array
        allTarrahs.tarrahs.push(newTarrah);

        // Save everything back to the JSON file
        writeJSON(pathToJson, allTarrahs);

        res.status(201).json({message: `${newTarrah.username} added to tarrahs successfully.`});
    } catch (error) {
        res.status(500).json({message: "Failed to add the new tarrah."});
    }
});

// Read - get all tarrahs
router.get('/', async (req, res) => {
    try {
        const tarrahs = await readFileAsync(pathToJson);
        res.status(200).json(tarrahs);
    } catch (error) {
        res.status(500).json({message: "Failed reading Tarrahs.json"})
    }
});

// Read - get a tarrah by its name
router.get('/:username', async (req, res) => {
    const allTarrahs = await readFileAsync(pathToJson); // Await the result of readFileAsync
    const tarrah = allTarrahs.tarrahs.find(t => t.username === req.params.username); // Access tarrahs from the resolved value
    if (!tarrah) {
        return res.status(404).json({message: "Tarrah not found"})
    }
    res.json(tarrah)
});

// Update - update a tarrah's followers
router.put('/followers/:username', async (req, res) => {
    const newFollower = req.body.follower;  // Get the new follower's name from the request body
    if (!newFollower) {
        return res.status(400).json({message: "No Follower name is given in the request body"});
    }

    // Read the JSON file
    const allTarrahs = await readFileAsync(pathToJson);

    // Find the tarrah based on its name
    const tarrah = allTarrahs.tarrahs.find(t => t.username === req.params.username);
    if (!tarrah) {
        return res.status(404).json({message: "Tarrah not found"});
    }

    // Check if the new follower already exists in the followers list
    if (tarrah.followers.includes(newFollower)) {
        return res.status(409).json({message: "Follower already exists"});
    }

    // Add the new follower to the list
    tarrah.followers.push(newFollower);

    // Write the updated data back to the JSON file
    writeJSON(pathToJson, allTarrahs);

    return res.status(200).json({message: `${newFollower} added to ${tarrah.username}'s followers`});
});


// Update - increment a tarrah's question count
router.put('/increment/:username', async (req, res) => {
    const allTarrahs = await readFileAsync(pathToJson);

    // Find the wanted tarrah by its name
    const tarrah = allTarrahs.tarrahs.find(t => t.username === req.params.username);
    if (!tarrah) {
        return res.status(404).json({message: "Tarrah not found"});
    }
    tarrah.questionCount++;
    writeJSON(pathToJson, allTarrahs);

    return res.status(200).json({message: `${tarrah.username}'s question count updated`});
});

// Delete - nothing for now

module.exports = router;
