const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
// const Promise = require('express-promise-router');
// const router2 = new Promise();


const db = require('../db');
// const { Router } = require('express');

//register-user
router.post('/', async (req, res, next) => {
    const { username, password: plainTextPassword, email } = req.body; // i guess we can alter the name of the req.body variable

    if(!email || typeof email !== 'string') {
        return res.json({status: 'error'});
    }
    if(!plainTextPassword || typeof plainTextPassword < 5) {
        return res.json({status: 'error'});
    }

    try {
        const password = await bcrypt.hash(plainTextPassword, 10);
        db.query(`INSERT INTO users(username, password, email) VALUES ($1,$2,$3);`, [username,password,email], (err,result) => {
                if(err) {
                    console.log(err);
                    return next(err)
                }
                
                res.json({ status: 'OK'});
            });
        // console.log(await bcrypt.hash(plainTextPassword, 10));
        // res.json({message: "recieved"});
    } catch (error) {
        if(error.code === 11000) {
            console.log('hit')
            res.json({message: `window.alert('duplicate key')`});
        }
        // throw error;
        console.log(error);
        res.status(500).json({message: "error with registration, please try again"})
    }
})



module.exports = router;