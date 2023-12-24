const express = require('express');
const app = express();

app.get("/test", (req, res) => {
    res.json("test2");
})
app.listen(4000, () => {
    console.log("Server is Running on Port 4000");
})