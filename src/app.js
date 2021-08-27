require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    session: {
      cookie: {
        domain: 'https://minidoro.herokuapp.com/'
      }
    },
    secret: `${process.env.secret}`,
    baseURL: 'http://localhost:3000',
    clientID: 'a8hvNO1ECUwNxnLrWuASR8JUqvOZ9g95',
    issuerBaseURL: 'https://dev-z69jo6so.us.auth0.com'
  };

var app = express();
//declare new express app
// app.use(express.json());

//enable cors for all methods
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "*")
//     next();
// })

app.use(auth(config));

// app.use('/login', require('./routes/Auth0'));

app.get('/', (req, res) => {

    if(req.oidc.isAuthenticated()) {
      res.redirect('/profile')
    }
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
      
});

// app.use('/', require('./routes/db-connection.js'));

// app.use('/profile', require('./routes/Profile'));

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// app.use('/', require('./routes/'))
app.use('/home', express.static(path.join(__dirname, '/public')))

// app.use('/callback', require('./route'))
// app.use('/user', require('./routes/User'));

app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))