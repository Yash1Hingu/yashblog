require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const imgbbUploader = require("imgbb-uploader");
const uploadMiddlewear = multer({ dest: 'uploads/' });
const fs = require('fs');
const UserModel = require('./models/User');
const PostModel = require('./models/Post');

const app = express();
const CLIENT_URL = "https://yashblog.vercel.app"
// const CLIENT_URL = "http://localhost:3000"
app.use(cors({ credentials: true, origin: CLIENT_URL }));
// app.use(cors(
//     {
//         origin: "https://yashblogs.onrender.com",
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//         allowedHeaders: ['Content-Type', "Authorization", "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin"],
//         credentials: true
//     }
// ))

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRETJWT;

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
mongoose.connect(process.env.MONGODB_ATLAS);

app.get('/', (req, res) => {
    res.json("My API Running");
})

app.post("/register", uploadMiddlewear.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    let newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    const uplfilepath = newPath;

    await imgbbUploader(process.env.IMGBB, newPath)
        .then((response) => {
            newPath = response.url;
        })
        .catch((error) => console.error(error));

    fs.unlinkSync(uplfilepath);

    const { userName, userPassword, userEmail } = req.body;

    try {
        const userDoc = await UserModel.create({
            userName,
            userPassword: bcrypt.hashSync(userPassword, salt),
            userEmail,
            profile: newPath
        });
        res.json(userDoc);
    } catch (e) {
        res.json(e);
    }
})

app.post("/login", async (req, res) => {
    const { userName, userPassword } = req.body;
    const userDoc = await UserModel.findOne({ userName });
    if (!userDoc) {
        res.status(400).json({ message: 'invalid_username' });
        return;
    }
    const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);
    if (passOk) {
        //logged in
        jwt.sign({ userName, id: userDoc.id, profile: userDoc.profile }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                id: userDoc._id,
                userName,
                profile: userDoc.profile
            });
        });
    } else {
        res.status(400).json({ message: 'invalid_userpassword' });
    }
})

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        })
    }
    res.json({});
})

app.post('/logout', (req, res) => {
    res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok');
})

app.post('/post', uploadMiddlewear.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    let newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    const uplfilepath = newPath;

    await imgbbUploader(process.env.IMGBB, newPath)
        .then((response) => {
            newPath = response.url;
        })
        .catch((error) => console.error(error));

    fs.unlinkSync(uplfilepath);

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

app.get('/userposts/:id', async (req, res) => {
    const { id } = req.params;
    const posts = await PostModel.find({ author: id }).populate('author', ['userName']).sort({ createdAt: -1 }).limit(20);
    res.json(posts);
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await PostModel.findById(id).populate('author', ['userName']);
    res.json(postDoc);
})

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const userDoc = await UserModel.findById(id, { userPassword: false });
    res.json(userDoc);
})
app.put('/post', uploadMiddlewear.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        const uplfilepath = newPath;

        await imgbbUploader(process.env.IMGBB, newPath)
            .then((response) => {
                newPath = response.url;
            })
            .catch((error) => console.error(error));

        fs.unlinkSync(uplfilepath);
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

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        await PostModel.deleteOne({ _id: id })
            .then(msg => res.json(msg))
            .catch(e => res.json(e));
    })
})
app.listen(4000, () => {
    console.log("Server is Running on Port 4000");
})