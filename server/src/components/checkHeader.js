function checkHeader(req, res, next) {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}

function checkAuthorization(req, res, next) {
    
}

module.exports = {
    checkHeader
}

