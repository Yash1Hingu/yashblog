const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const {userName,userPassword} = req.body;
    res.json({userName,userPassword});
})
app.listen(4000, () => {
    console.log("Server is Running on Port 4000");
})