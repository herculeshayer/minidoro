require('dotenv').config();
const express = require('express');
// const pg = require('pg');
const path = require('path');
const mountRoutes = require('./routes')
var app = express();
app.use(express.json());

// enable cors for all methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Credentials", true)
    next();
})

app.get('/', (req, res) => {
    res.send('hi');
})
//declare new express app
// app.use('/', express.static(path.join(__dirname, 'index.html')))

mountRoutes(app);

// app.use('/', require('./routes/db-connection.js'));


// app.use('/api', require('./routes/User'))



app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))