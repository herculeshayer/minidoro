require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Router = require('express-promise-router');
const db = require('./../db');


const router = new Router();


router.post('/', async (req, res) => {
    const { token, newPassword } = req.body;
    
    console.log(token);
    
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const id = user.id;

        const password = await bcrypt.hash(newPassword, 10);

        await db.asyncQuery('UPDATE users SET password = $1 WHERE user_id = $2', [password, id]);
        res.json({status: 'ok'})
        
    } catch (error) {
        throw error;
    }
})



module.exports = router;
