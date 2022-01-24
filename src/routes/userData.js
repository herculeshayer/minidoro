require('dotenv').config();
const Router = require('express-promise-router');
const bcrypt = require('bcryptjs');
const db = require('../db');
const jwt = require('jsonwebtoken');

const router = new Router();
const { checkHeader } = require('./../components/checkHeader');

router.get('/:id', checkHeader, async (req, res) => {
    try {
        res.send('user info');
    } catch (error) {
        throw error;
    }
})

module.exports = router;