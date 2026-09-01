# SoalPich - Online Quiz Platform - Backend

A RESTful backend service for an online quiz platform, built with **Node.js** and **Express.js** as part of a collaborative university web development project.

This backend supports the frontend application by providing APIs for user authentication, quiz questions, categories, player profiles, scoring, rankings, answered questions, question designers, and social interactions.

## Features

### Authentication

The API supports registration and login for two different user roles:

- **Players**
- **Question Designers**

During registration, the backend stores user information and initializes role-specific profile data.

Supported operations include:

- Registering new users
- Player login
- Question designer login
- Duplicate username and email validation
- Password verification

### Quiz Questions

The backend provides endpoints for:

- Retrieving all questions
- Retrieving questions by category
- Retrieving a random question
- Retrieving a random question from a specific category
- Adding new questions

Each question may contain:

- Category
- Question text
- Multiple choices
- Correct answer
- Difficulty level
- Question designer

### Categories

Question designers can manage quiz categories through the API.

Supported functionality includes:

- Retrieving all categories
- Creating new categories
- Preventing duplicate categories

### Player Profiles

The backend manages player information such as:

- Username
- Email
- Score
- Biography
- Gender
- Followers
- Followings
- Answered questions

The API can retrieve:

- All player profiles
- A specific player's profile
- A player's score
- A player's answered questions

### Scoring and Answer History

After answering a quiz question, the frontend can update the player's profile through the backend.

The API stores:

- Updated score
- Question text
- Player's selected answer

This makes it possible to maintain a history of previously answered questions.

### Question Designer Profiles

Question designers have separate profiles containing information such as:

- Username
- Email
- Number of submitted questions
- Followers
- Gender

The backend provides endpoints for:

- Retrieving all designers
- Retrieving an individual designer
- Adding designers
- Updating follower lists
- Incrementing a designer's question count

### Social Features

The platform includes basic social functionality.

The API supports:

- Following question designers
- Maintaining designer follower lists
- Maintaining player follower/following information
- Retrieving followed users through profile data

## Technologies

- **Node.js**
- **Express.js**
- **JavaScript**
- **REST APIs**
- **JSON-based file storage**
- **CORS**
- **Node.js File System API**

Additional dependencies include:

- `body-parser`
- `cookie-parser`
- `morgan`
- `http-errors`
- `debug`
- `pug`

## Project Structure

```text
.
├── bin/
│   └── www
├── src/
│   ├── data/
│   │   ├── AnsweredQuestions.json
│   │   ├── Categories.json
│   │   ├── ExistingGroups.json
│   │   ├── ExistingQuestions.json
│   │   ├── players.json
│   │   ├── Questions.json
│   │   └── Tarrahs.json
│   │
│   ├── routes/
│   │   ├── answeredQuestions.js
│   │   ├── answering.js
│   │   ├── auth.js
│   │   ├── categories.js
│   │   ├── playerProfileCard.js
│   │   ├── profiles.js
│   │   ├── questions.js
│   │   └── tarrahs.js
│   │
│   ├── utils/
│   │   └── fileHelper.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
└── README.md
```

## API Overview

The backend runs locally on:

```text
http://localhost:5004
```

### Authentication

```text
POST /api/auth/login
POST /api/auth/register
```

### Categories

```text
GET  /api/categories
POST /api/categories/add
```

### Questions

```text
GET  /api/questions
GET  /api/questions/:category
POST /api/questions/add
```

### Quiz Answering

```text
GET /api/answering/random
GET /api/answering/category/:category
```

### Player Profiles

```text
GET /api/profiles/players
GET /api/profiles/:username
GET /api/player/:username

PUT /api/profiles/updateScore/:username
PUT /api/profiles/players/followings/:name
```

### Answered Questions

```text
GET /api/answered-questions/:username
```

### Question Designers

```text
GET  /api/tarrahs
GET  /api/tarrahs/:username
POST /api/tarrahs/add

PUT /api/tarrahs/followers/:username
PUT /api/tarrahs/increment/:username
```

## Installation

Clone the repository and install the project dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The API will be available at:

```text
http://localhost:5004
```

## Data Storage

This version of the project uses local **JSON files** instead of a database.

For example:

```text
src/data/players.json
src/data/Questions.json
src/data/Categories.json
src/data/Tarrahs.json
```

The server reads and updates these files directly using the Node.js File System API.

This approach was chosen for the academic version of the project to keep data persistence simple while focusing on backend routing, API design, and frontend-backend integration.

## Frontend Integration

This repository provides the backend service for the corresponding React frontend of the online quiz platform.

The frontend communicates with this API for operations such as:

- Authentication
- User registration
- Loading quiz questions
- Creating questions
- Loading categories
- Updating player scores
- Retrieving rankings and profiles
- Managing follower relationships

Both projects are intended to run together during local development.

## Project Background

This backend was developed in a team as part of web development course project at CE department of Sharif University of Technology.

The project provided practical experience with:

- Building REST APIs with Express.js
- Designing route-based backend architecture
- File-based data persistence
- Frontend-backend integration
- Managing multiple user roles
- Modeling quiz, profile, and social interactions
