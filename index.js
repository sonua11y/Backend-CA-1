const express = require('express');
require('dotenv').config();

const app=express();
const PORT=3010;

app.use(express.static('static'));

app.get('/', (req,res) => {
    res.send("Hello, welcome to the signup page!");
});

app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});
