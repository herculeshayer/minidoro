const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

var app = express();
//declare new express app
app.use(express.json());

//enable cors for all methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next();
})




app.listen(process.env.PORT, ()=>console.log(`listening on ${process.env.PORT}`))