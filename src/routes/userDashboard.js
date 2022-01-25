require('dotenv').config();
// const Router = require('express-promise-router');
const bcrypt = require('bcryptjs');
const db = require('../db');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
// const router = new Router();
const { checkCookie } = require('../middleware/validateCookie');

router.get('/', checkCookie, async (req, res) => {



    try {

        // var payload;

        if(req.cookieStatusCode === "200") {
            console.log('status: ', req.cookieStatusCode);
            console.log('we good', req.cookies["access-token"]);

            const base64decode = req.cookies["access-token"].split(".")[1];
            console.log('base64', base64decode);
            const base64 = base64decode.replace(/-/g, '+').replace(/_/g, '/');
            const buff = new Buffer.from(base64, 'base64');
            const payloadINIT = buff.toString('ascii');
            const payload = JSON.parse(payloadINIT);
            console.log(payload.username);
            
            const user = await db.asyncQuery('SELECT * FROM users WHERE username = $1', [payload.username])
            console.log(user.rows[0])
            res.status(200).send(`<html><h1>${user.rows[0].username} dashboard</h1></html>`);
        }

        // console.log(payload.username)

        // res.send(`<html><h1>user dashboard</h1></html>`);
    } catch (error) {
        throw error;
    }
})

module.exports = router;