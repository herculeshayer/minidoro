require('dotenv').config();
const express = require('express');

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
    origin: process.env.DOMAIN_ORIGIN
}));
app.options('*', cors());


app.get('/', (req, res) => {
    res.send('hi');
})


mountRoutes(app);



app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))