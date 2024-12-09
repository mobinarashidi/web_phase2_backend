const app = require('./app');
const port = 5009;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
