require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


var app = express();
//declare new express app
app.use(express.json());

//enable cors for all methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next();
})


app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/login', require('./routes/User'));

app.listen(process.env.PORT, ()=>console.log(`listening on ${process.env.PORT}`))