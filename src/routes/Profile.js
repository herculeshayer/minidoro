const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const { auth } = require('express-openid-connect');
const app = express();
const router = express.Router();



app.get('/', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});


module.exports = router;