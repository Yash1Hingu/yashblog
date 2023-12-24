require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserModel = require('./models/User');
const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_ATLAS);

app.post("/register", async (req, res) => {
    const { userName, userPassword } = req.body;

    try {
        const userDoc = await UserModel.create({
            userName,
            userPassword: bcrypt.hashSync(userPassword, salt)
        });
        res.json(userDoc);
    } catch (e) {
        res.json(e);
    }
})

app.post("/login", async (req, res) => {
    const { userName, userPassword } = req.body;
    const userDoc = await UserModel.findOne({ userName });
    res.json(userDoc);
})
app.listen(4000, () => {
    console.log("Server is Running on Port 4000");
})