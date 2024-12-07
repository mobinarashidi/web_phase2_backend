const app = require('./app');
const port = 5008;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
