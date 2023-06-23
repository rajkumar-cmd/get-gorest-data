const express = require("express");
const app = express();
const axios = require('axios');
const { connection } = require("./db");
const { gorestModel } = require("./model/gorest.model.js");


require("dotenv").config();
const cors = require("cors");
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Home Page");
})

app.get('/fetch-data', async (req, res) => {
    try {
        // Fetch data from the API
        const response = await axios.get('https://gorest.co.in/public-api/users');
        const data = response.data.data;
        console.log(data);
        // Store the data in the database
        await gorestModel.create(data);

        res.send('Data fetched and stored successfully');
    } catch (error) {
        console.error('Error fetching and storing data:', error);
        res.send({'An error occurred':error});
    }
});

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected");
    } catch (err) {
        console.log("ERROR:", err);
    }
    console.log("Port running at 8080");
})