const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.post("/register", (req, res) => {
    
    res.json("test2");
})
app.listen(4000, () => {
    console.log("Server is Running on Port 4000");
})