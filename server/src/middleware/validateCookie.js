const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

async function checkCookie(req, res, next) {
  try {
    const cookie = req.cookies["access-token"];

    if (cookie == undefined || cookie == "") {
      console.log("No Cookie or Invalid Cookie");
      res.status(403).send("Invalid Cookie");
      //   res.send("Invalid Cookie").status(403);
      next();
    } else {
      validateAuthentication(cookie);

      next();
    }
  } catch (error) {
    console.log("checkCookieErr", error);
    res.status(401).send("Unauthorized Access");
  }
}

function validateAuthentication(cookieToken) {
  var flag;
  try {
    if (cookieToken) {
      return jwt.verify(cookieToken, process.env.JWT_SECRET);
    } else {
      console.log("valid JWT not present in cookie");
    }

    if (cookieToken) {
      jwt.verify(cookieToken, process.env.JWT_SECRET);
      flag = true;
    } else {
      console.log("valid JWT not present in cookie");
      flag = false;
    }
  } catch (error) {
    console.log("JWT is not verified", error);
    // res.status(403).send("Unverified JWT, please login")
  } finally {
    return flag;
  }
}

module.exports = {
  checkCookie,
  validateAuthentication,
};
