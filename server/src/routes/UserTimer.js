require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");

const { checkCookie } = require("../middleware/validateCookie");

router.get("/completed-pomodoro", checkCookie, async (req, res) => {
  try {
    const cookie = req.cookies["access-token"];
    console.log("Request Cookie: ", cookie);

    res.send(req.headers).status(200);
  } catch (error) {
    console.warn("/api/timer/completed-pomodoro", error);
  }
});
router.post("/completed-pomodoro", checkCookie, async (req, res) => {
  try {
    const cookie = req.cookies["access-token"];

    const sessionDate = req.headers["date-iso"];
    const dateOptions = { year: "numeric", day: "2-digit", month: "long" };
    const sessionDateFormat = new Date(sessionDate).toLocaleString(
      "en-us",
      dateOptions
    );
    console.log("sessiondateformat: ", sessionDateFormat);
    const decodedJWT = jwt.decode(cookie);

    const jwtusername = decodedJWT.username;
    const jwtemail = decodedJWT.email;

    /**
     *  0. have client send their Date.now() with localtimezone
     *  1. get users local time zone from req.body
     *  2. convert users local time to session date format("dd-mm-yyyy")
     *  3. query db for user with calculated session date
     *  4. if sessiondate does not exist, create new entry for the day
     *  5. if sessiondate does exist, update pomodorocount
     *
     */

    const query = "insert";
    // if (String(jwtusername).length && String(jwtemail).length > 0) {
    //   db.asyncQuery(`select username from pomodoros where date = ${time});`);
    // }

    if (true) {
      res.send("Good").status(201);
    } else {
      res.send("Not Created").status(400);
    }
  } catch (error) {
    console.warn("/api/timer/complete", error);
  }
});

module.exports = router;
