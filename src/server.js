require('dotenv').config();

const path = require('path');
const express = require('express');
const flash = require('connect-flash');

const admin = require('./admin')
const route = require('./routes')



const app = express();

const passport = require("passport")
const session = require('express-session')
require('../authentication/auth')(passport)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())


app.use(route)
app.use(admin)

let port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`)
})