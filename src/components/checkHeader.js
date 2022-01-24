function checkHeader(req, res, next) {
    // const cookie = req.cookies;

    // if(cookieExist(req.headers.cookie)) {
    //     next();
    // }

    // if(typeof cookie !== 'undefined') {
    //     const bearer = header.split(' ');
    //     const token = bearer[1];
        
    //     req.token = token;
    //     next();
    // } else {
    //     res.sendStatus(403);
    // }
}

function checkAuthorization(req, res, next) {
    
}

module.exports = {
    checkHeader
}

