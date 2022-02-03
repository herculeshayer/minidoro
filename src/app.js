require('dotenv').config();
const express = require('express');
// const pg = require('pg');
const path = require('path');
const mountRoutes = require('./routes')
var app = express();
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set("trust proxy", 1);

/**
 * enable cors for all methods
 * 
 * TODO: Need to alter for cross site approach
 * 
 */
const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: true
}));
app.options('*', cors());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", process.env.DOMAIN_ORIGIN)
//     res.header("Access-Control-Allow-Headers", "Content-Type")
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE")
//     res.header("Access-Control-Allow-Credentials", true)
//     next();
// })

app.get('/', (req, res) => {
    res.send('hi');
})
//declare new express app
// app.use('/', express.static(path.join(__dirname, 'index.html')))

mountRoutes(app);

// app.use('/', require('./routes/db-connection.js'));


// app.use('/api', require('./routes/User'))



app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))