require("dotenv").config();
const Router = require("express-promise-router");
const bcrypt = require("bcryptjs");
const db = require("../db");
const jwt = require("jsonwebtoken");

const router = new Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const databaseUser = await db.asyncQuery(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const databaseUserName = databaseUser.rows[0].username;
    const databasePassword = databaseUser.rows[0].password;

    /**
     * If no password or username is entered, send json response
     */
    if (!databasePassword | !databaseUserName) {
      res.json({ status: "error", error: "invalid username/password" });
    }

    //We're passing back success JSON
    //If password in db matches req.body password, execute conditional
    if (await bcrypt.compare(password, databasePassword)) {
      //This info is not hidden, don't pass sensitive info
      //User token
      jwt.sign(
        {
          id: databaseUser.rows[0].user_id,
          username: databaseUserName,
          email: databaseUser.rows[0].email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) {
            console.log(err);
          }

          if (token) {
            res.cookie("access-token", token, {
              maxAge: 3600000 * 24,
              httpOnly: true,
              sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
              secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
              // domain: process.env.COOKIE_DOMAIN
            });
          }
          res.status(200).json({ status: "OK", tokenData: token });
        }
      );
    } else {
      res.status(404).json({ message: "password does not match db password" });
    }
  } catch (error) {
    console.error("Error: /api/login: ", error);
    res.status(500).json({ message: error });
    throw error;
  }
});

module.exports = router;
