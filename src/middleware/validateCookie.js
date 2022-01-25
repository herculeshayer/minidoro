const jwt = require('jsonwebtoken');

async function checkCookie (req, res, next) {

    // console.log('checkCookie')
    // next();
    
    try {
        console.log('checkCookie');
        // next();
        const cookie = req.cookies['access-token'];
        // console.log(cookie);
        if(cookie === undefined) {
            res.status(404).send('Cookie Undefined');
        }
        if(cookie !== undefined && validateAuthentication(cookie)) {
            req.cookieStatusCode = '200';
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

