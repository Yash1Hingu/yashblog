require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_ATLAS);

app.post("/register", async (req, res) => {
    const { userName, userPassword } = req.body;

    try {
        const userDoc = await UserModel.create({ userName, userPassword });
        res.json(userDoc);
    } catch (e) {
        res.json(e);
    }
})
app.listen(4000, () => {
    console.log("Server is Running on Port 4000");
})