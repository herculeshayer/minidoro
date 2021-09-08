const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../db');

router.get('/user', (req,res) => {
    try {
        res.json({message: 'user'})
    } catch (error) {
        res.json({message: error})
    }
})

router.get('/user/:id', (req, res, next) => {
    try {
        db.query('SELECT * FROM users WHERE user_id = $1', [req.params.id], (err, result) => {
            if(err) {
                return next(err)
            }
            res.send(result.rows[0])
        })
        // res.json({message: 'yolo'});
        // res.json(req.body);
    } catch (error) {
        
    }
})
//registration
router.post('/user', async (req,res,next) => {
    const { username, password, email } = req.body; // i guess we can alter the name of the req.body variable

    // if(!email || typeof email !== 'string') {
    //     return res.json({status: 'error'});
    // }
    // if(!plainTextPassword || typeof plainTextPassword < 5) {
    //     return res.json({status: 'error'});
    // }

    try {//need to check out correct params for query
        db.query(`INSERT INTO users (username, password, email) VALUES (${username}, ${password}, ${email});`, [req.body], (err,result) => {
                if(err) {
                    return next(err)
                }
                res.send(result.rows[0]);
            });
        // console.log(await bcrypt.hash(plainTextPassword, 10));
        res.json({message: "recieved"});
    } catch (error) {
        if(error.code === 11000) {
            res.json(`window.alert('duplicate key')`);
        }
        throw error;
        // res.json({message: error})
    }
})
//login
// router.post('/user/login', (req, res) => {
//     try {
//         res.send({message: "user successfully logged in"})
//     } catch (error) {
        
//     }
// })



module.exports = router;