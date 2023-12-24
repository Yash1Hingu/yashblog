require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRETJWT;

app.use(cors({credentials: true,origin:'http://localhost:3000'}));
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
    const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);
    if (passOk) {
        //logged in
        jwt.sign({ userName, id: userDoc.id }, secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token',token).json('ok');
        });
    } else {
        res.status(400).json('wrong credentials');
    }
})
app.listen(4000, () => {
    console.log("Server is Running on Port 4000");
})