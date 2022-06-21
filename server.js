require('dotenv').config()
const express = require('express');
const path = require("path");

const { PORT } = process.env

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

// Route



app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
})


app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`)
})