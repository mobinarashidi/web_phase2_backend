const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();


// دریافت تمامی پروفایل‌ها
const profilesPath = path.join(__dirname, '../data/players.json'); // مسیر فایل JSON

// توابع کمکی برای خواندن و نوشتن فایل
const readFileAsync = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

const writeFileAsync = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// دریافت لیست پروفایل‌ها
router.get('/players', async (req, res) => {

    try {
        const data = await readFileAsync(profilesPath);
        res.json(data.players);
    } catch (error) {
        console.error("Error reading profiles:", error.message);
        res.status(500).json({ message: 'Failed to load profiles', error: error.message });
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


router.put('/players/followings/:name', async (req, res) => {
    const newFollowing = req.body.following; // The name of the player to follow
    if (!newFollowing) {
        return res.status(400).json({ message: "No following name provided in the request body" });
    }

    try {
        // Read the JSON file
        const allPlayers = await readFileAsync(profilesPath);

        // Find the player who is following
        const player = allPlayers.players.find(p => p.name === req.params.name);
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        // Find the player to be followed
        const followingPlayer = allPlayers.players.find(p => p.name === newFollowing);
        if (!followingPlayer) {
            return res.status(404).json({ message: "Player to follow not found" });
        }

        // Check if the player is already following the target
        if (player.followings.includes(newFollowing)) {
            return res.status(409).json({ message: "Player is already following this user" });
        }

        // Add the target player to the following list
        player.followings.push(newFollowing);

        // Ensure the target player's followers list exists
        if (!followingPlayer.followers) {
            followingPlayer.followers = [];
        }

        // Add the current player to the followers list
        if (!followingPlayer.followers.includes(player.name)) {
            followingPlayer.followers.push(player.name);
        }

        // Save the updated data back to the JSON file
        await writeFileAsync(profilesPath, allPlayers);

        return res.status(200).json({
            message: `${player.name} is now following ${newFollowing}`,
        });
    } catch (error) {
        console.error("Error updating followings:", error.message);
        res.status(500).json({ message: 'Failed to update followings', error: error.message });
    }
});

router.put('/updateScore/:username', async (req, res) => {
    const allPlayers = await readFileAsync(profilesPath);

    // creating new added question
    const newAddedQuestion = {
        "text": req.body.text,
        "answered": req.body.answer
    };

    // Find the player who is following
    const player = allPlayers.players.find(p => p.username === req.params.username);
    if (!player) {
        return res.status(404).json({ message: "Player not found" });
    }

    // updating player's answered questions
    player.answeredQuestions.push(newAddedQuestion);

    // updating player's score
    player.score = req.body.score;

    // Write the updated data back to the JSON file
    await writeFileAsync(profilesPath, allPlayers);
    return res.status(200).json({
        message: `${player.name} profile updated`,
    });
});

module.exports = router;

