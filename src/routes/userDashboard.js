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
            const base64decode = req.cookies["access-token"].split(".")[1];
            const base64 = base64decode.replace(/-/g, '+').replace(/_/g, '/');
            const buff = new Buffer.from(base64, 'base64');
            const payloadINIT = buff.toString('ascii');
            const payload = JSON.parse(payloadINIT);
            
            
            const user = await db.asyncQuery('SELECT * FROM users WHERE username = $1', [payload.username])
            
            res.status(200).json({"username": user.rows[0].username, "email": user.rows[0].email});
        
    } catch (error) {
        throw error;
    }
})

module.exports = router;