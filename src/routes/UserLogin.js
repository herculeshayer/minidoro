require('dotenv').config();
const Router = require('express-promise-router');
const bcrypt = require('bcryptjs');
const db = require('../db');
const jwt = require('jsonwebtoken');

const router = new Router();


// router.get('/:id', async (req, res) => {
//     try {
//         const rows = await db.asyncQuery('SELECT * FROM users WHERE username = $1', [req.params.id]);

//         console.log('cookies', req.cookies);
//         console.log('user', rows.rows[0]);
//         res.send(rows.rows[0]);
//     } catch (error) {
//         throw error;
//     }
// })

router.post('/', async (req, res) => {
    const { username, password } = req.body;


    try {
        const databaseUser = await db.asyncQuery('SELECT * FROM users WHERE username = $1', [username])
        const databaseUserName = databaseUser.rows[0].username;
        const databasePassword = databaseUser.rows[0].password;

        /**
         * Maybe give below a try if everything else doesn't work
         */
        // if (req.method === "OPTIONS") {
        //     res.header('Access-Control-Allow-Origin', req.headers.origin);
        // } else {
        //     res.header('Access-Control-Allow-Origin', '*');
        // }

        /**
         * If no password or username is entered, send json response
         */
        if(!databasePassword | !databaseUserName) {
            res.json({ status: "error", error: 'invalid username/password'})
        } 
        //We're passing back success JSON
        //If password in db matches req.body password, execute conditional
        if(await bcrypt.compare(password,databasePassword)) {
            console.log(await bcrypt.compare(password,databasePassword))
            // res.send(databaseUser);
            
            //This info is not hidden, don't pass sensitive info
            //User token
            jwt.sign({
                    id: databaseUser.rows[0].user_id,
                    username: databaseUserName,
                    email: databaseUser.rows[0].email
                }, 
                process.env.JWT_SECRET, {
                    expiresIn: '1h'
                }, (err, token) => {
                    if (err) {
                        console.log(err);
                    } 

                    if(token) {
                        res.cookie('access-token', token, {
                            maxAge: 3600000,
                            httpOnly: true,
                            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
                            secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
                            // domain: process.env.COOKIE_DOMAIN
                        })
                        
                    }
                    // res.setHeader('Set-Cookie', token);

                    // res.redirect('http://localhost:3000/dashboard');
                    res.status(200).json({ status: 'OK', tokenData: token })
                }
            )

        } else {

            res.send('password does not match db password');
        }

    } catch (error) {
        throw error;
    }

})

module.exports = router;