const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const categoriesRoutes = require('./routes/categories');
const questionsRoutes = require('./routes/questions');
const answeredQuestionsRoutes = require('./routes/answeredQuestions');
const profilesRoutes = require('./routes/profiles');
const playerProfileCardRoutes = require('./routes/playerProfileCard');
const tarrahsRoutes = require('./routes/tarrahs');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/answered-questions', answeredQuestionsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/player', playerProfileCardRoutes);
app.use('/api/tarrahs', tarrahsRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz API!');
});

module.exports = app;
