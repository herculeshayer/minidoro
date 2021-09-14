require('dotenv').config();
const express = require('express');
// const pg = require('pg');
const path = require('path');
const mountRoutes = require('./routes')
var app = express();
app.use(express.json());

mountRoutes(app);

//declare new express app

// enable cors for all methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Credentials", true)
    next();
})

// app.use('/', require('./routes/db-connection.js'));


// app.use('/api', require('./routes/User'))
app.use('/', express.static(path.join(__dirname, '/public')))



app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))