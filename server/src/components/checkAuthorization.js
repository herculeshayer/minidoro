const jwt = require('jsonwebtoken');

function checkAuth(token) {

    if(jwt.verify(token, process.env.JWT_SECRET)) {
        return true;
    } 

    return false;
}

export default checkAuth;
