const express = require('express')
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
const app = express()
const dotenv = require('dotenv')
const connectToDB = require('./config/db')
const cookieParser = require('cookie-parser')

dotenv.config();
connectToDB();

app.set("view engine", 'ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', indexRouter);
app.use('/user', userRouter);

// this is used because sometime server is stopped running because of some errors to prevent server from stopping we use this
// another alternative of this is we can use try and catch block for every section
// this is a global way of doing it, but it is not recommended because in this no response is sent to the user
// using try and catch is recommended for standard use
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception');
    console.log(err)
})

app.listen(3000, () => {
    console.log('Server is Running on Port 3000');
})