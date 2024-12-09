// creating server using http method

// const http = require('http')
//
// const server = http.createServer((req, res) => {
//     if (req.url === '/about') {
//         res.end("Welcome to About Page");
//     }
//     else if (req.url === '/profile') {
//         res.end("Welcome to Profile Page");
//     }
//     else if (req.url === '/contact') {
//         res.end("This is Contact Page");
//     }
//     else {
//         res.end("hello World!");
//     }
// })
//
// server.listen(3000);

// creating server using Express

const express = require('express');
const app = express();


const dbConnection = require('./config/db')
const userModal = require('./models/user')
const e = require("express");

// setting view engine necessary for using render() function
app.set('view engine', 'ejs');

// Middleware
app.use((req, res, next) => {
    console.log('This is a middleware. what are your thoughts about that.')
    return next();
})

// for using static files like style.css or script.js mostly located in public folder
app.use(express.static('public'))

// creating a get route
app.get('/', (req, res) => {
    // res.send("Hi! This is the Home Page");
    res.render('index')
})

app.get('/about',
    //second argument is a middleware
    (req, res, next) => {
        console.log("this middle ware is only for the about page");
        return next();
    },
    // third argument is a callback function
    (req, res) => {
        res.send("Hi! This is the About Page");
    }
)

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/profile', (req, res) => {
    res.send("Hi! This is the Profile Page");
})

app.get('/get-users', (req, res) => {
    // find is used to get all users when no condition is given to it.
    // userModal.find().then((users) => {
    //     res.send(users);
    // })
    // we can also provide a condition to find method. and when no user matches the condition it returns an ** empty array **
    // userModal.find({
    //     username: 'abc'
    // }).then((users) => {
    //     res.send(users);
    // })
    // their is another method called findOne() which gives only the first result of the match
    // And if no match is found then ** null ** is returned in this
    userModal.findOne({
        username: 'dhruv21'
    }).then((users) => {
        res.send(users);
    })
})

app.get('/update-user', async (req, res) => {
    await userModal.findOneAndUpdate({
        username: 'pushpa21'
    }, {
        email: 'dhruvkothari1978@gmail.com'
    })
    res.send("user updated successfully")
})

app.get('/delete', async (req, res) => {
    await userModal.findOneAndDelete({
        username: 'pushpa21'
    })

    res.send('user deleted')
})

// by default; we can not read the data received from post method to read them we have to use some middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    const user = await userModal.create({
        username: username,
        email: email,
        password: password
    })
    res.send(user)
})

app.post('/get-data', (req, res, next) => {
    // console.log(req.query); works only with get routs
    console.log(req.body)
    res.send('Data Received');
})

app.listen(3000);

