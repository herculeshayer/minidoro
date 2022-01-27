const jwt = require('jsonwebtoken');

async function checkCookie (req, res, next) {

    
    try {

        const cookie = req.cookies['access-token'];

        if(cookie === undefined) {
            res.status(403).send('Cookie Undefined');
        }

        if(validateAuthentication(cookie)) {
            next();
        } 

    } catch (error) {
        console.log('checkCookieErr', error);
        res.status(401).send("Unauthorized Access")
    }
    
    
}

async function validateAuthentication(cookieToken) {
    try {
        
        return jwt.verify(cookieToken, process.env.JWT_SECRET)
    } catch (error) {
        console.log('JWT is not verified', error);
        res.status(403).send("Unverified JWT, please login")
    }
}

module.exports = {
    checkCookie
};

