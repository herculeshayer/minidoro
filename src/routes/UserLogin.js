require('dotenv').config();
const Router = require('express-promise-router');
const bcrypt = require('bcryptjs');
const db = require('../db');
const jwt = require('jsonwebtoken');

const router = new Router();


router.get('/:id', async (req, res) => {
    try {
        const rows = await db.asyncQuery('SELECT * FROM users WHERE username = $1', [req.params.id]);

        res.send(rows.rows[0]);
    } catch (error) {
        throw error;
    }
})

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const databaseUser = await db.asyncQuery('SELECT * FROM users WHERE username = $1', [username])
        const databaseUserName = databaseUser.rows[0].username;
        const databasePassword = databaseUser.rows[0].password;

        //Doesn't work?
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
            const token = jwt.sign({
                    id: databaseUser.rows[0].user_id,
                    username: databaseUserName,
                    email: databaseUser.rows[0].email
                }, 
                process.env.JWT_SECRET
            )

            res.json({ status: 'OK', tokenData: token })
        } else {

            res.send('password does not match db password');
        }

    } catch (error) {
        throw error;
    }

})

module.exports = router;