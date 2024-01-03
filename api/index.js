require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddlewear = multer({ dest: 'uploads/' });
const fs = require('fs');
const UserModel = require('./models/User');
const PostModel = require('./models/Post');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRETJWT;

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
mongoose.connect(process.env.MONGODB_ATLAS);
app.use(cors({ credentials: true, origin: /\.onrender\.com$/ }));
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://yashblogs.onrender.com"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);

    next();
});

app.get('/', (req, res) => {
    console.log('hello');
})

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
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                userName,
            });
        });
    } else {
        res.status(400).json('wrong credentials');
    }
})

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '',).json('ok');
})

app.post('/post', uploadMiddlewear.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        })
        res.json(postDoc);
    })
})

app.get('/post', async (req, res) => {
    const posts = await PostModel.find().populate('author', ['userName']).sort({ createdAt: -1 }).limit(20);
    res.json(posts);
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findById(id).populate('author', ['userName']);
    res.json(postDoc);
})

app.put('/post', uploadMiddlewear.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content, id } = req.body;
        const postDoc = await PostModel.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not a Author');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        })
        res.json(postDoc);
    })
})
app.listen(4000, () => {
    console.log("Server is Running on Port 4000");
})