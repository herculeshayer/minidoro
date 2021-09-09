const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../db');

//registration
router.post('/register', async (req,res,next) => {
    const { username, password: plainTextPassword, email } = req.body; // i guess we can alter the name of the req.body variable

    if(!email || typeof email !== 'string') {
        return res.json({status: 'error'});
    }
    if(!plainTextPassword || typeof plainTextPassword < 5) {
        return res.json({status: 'error'});
    }

    try {//need to check out correct params for query
        const password = await bcrypt.hash(plainTextPassword, 10);
        db.query(`INSERT INTO users(username, password, email) VALUES ($1,$2,$3);`, [username,password,email], (err,result) => {
                if(err) {
                    return next(err)
                }
                // res.redirect(201, '../public/login.html');
                //, "data": `User: ${username} w/ email: ${email} added`
                res.json({ status: 'OK'});
            });
        // console.log(await bcrypt.hash(plainTextPassword, 10));
        // res.json({message: "recieved"});
    } catch (error) {
        if(error.code === 11000) {
            res.json(`window.alert('duplicate key')`);
        }
        throw error;
        // res.json({message: error})
    }
})

//login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // const hashedPassword = await bcrypt.compare();

    try {
        const dbPassword = db.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
            if(err) {
                return next(err)
            }
            return result.row[0];
        })
        const hashedPassword = await bcrypt.compare(password, dbPassword.password);
        console.log(hashedPassword);
    } catch (error) {
        throw error;
    }
    res.json({status: 'ok'})
})

//login
router.get('/login/:id', (req, res, next) => {
    try {
        db.query('SELECT * FROM users WHERE username = $1', [req.params.id], (err, result) => {
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

module.exports = router;