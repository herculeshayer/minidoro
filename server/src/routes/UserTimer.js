require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");

const { checkCookie } = require("../middleware/validateCookie");

/**
 * get all pomodoros completed for a (1day, 7day, 30day, 365day)
 */
// router.get("/completed-pomodoro", checkCookie, async (req, res) => {
//   try {
//     const cookie = req.cookies["access-token"];
//     console.log("Request Cookie: ", cookie);

//     res.send(req.headers).status(200);
//   } catch (error) {
//     console.warn("/api/timer/completed-pomodoro", error);
//   }
// });

router.post("/completed-pomodoro", checkCookie, async (req, res) => {
  try {
    const cookie = req.cookies["access-token"];
    console.log("Headers: ", req.headers);

    const sessionDate = req.headers["date-iso"];
    console.log("Client Sessions Date: ", sessionDate);

    console.log("Body: ", req.body);

    const sessionDateFormatIntl = new Date(sessionDate);
    const intlDateOptions = { dateStyle: "short" };
    const intlFormat = new Intl.DateTimeFormat("en-CA", intlDateOptions).format(
      sessionDateFormatIntl
    );
    console.log("intl: ", intlFormat);

    const decodedJWT = jwt.decode(cookie);

    const jwtusername = decodedJWT.username;
    const jwtemail = decodedJWT.email;

    console.log("jwtusername: ", jwtusername);

    console.log("jwtemail: ", jwtemail);

    const checkIfSessionExists = `
SELECT *
FROM pomodoros p, users u
WHERE u.userid = p.userid
  AND u.username = $1
  AND u.email = $2
  AND p.sessiondate = $3;
`;

    const createSessionWith_OnePomodoro = `
INSERT INTO pomodoros (userid, pomodorocount, sessiondate)
SELECT userid, 1, $1
FROM users
WHERE username = $2
  AND email = $3;
`;

    const updatePomodoroTable_IncrementByOne = `
UPDATE pomodoros p
SET pomodorocount = pomodorocount + 1
FROM users u
WHERE u.userid = p.userid
  AND u.username = $1
  AND u.email = $2
  AND p.sessiondate = $3;
`;
    if (String(jwtusername).length > 0 && String(jwtemail).length > 0) {
      const q = await db.asyncQuery(checkIfSessionExists, [
        jwtusername,
        jwtemail,
        intlFormat,
      ]);
      if (q.rows.length > 0) {
        console.log("We have a session for today");
        const r = await db.asyncQuery(updatePomodoroTable_IncrementByOne, [
          jwtusername,
          jwtemail,
          intlFormat,
        ]);
        console.log("R: ", r.rows);
      } else {
        console.log("A session does not exist for today");
        const s = await db.asyncQuery(createSessionWith_OnePomodoro, [
          intlFormat,
          jwtusername,
          jwtemail,
        ]);
        console.log("S: ", s.rows);
      }
      console.log("Q: ", q.rows);
    }

    res.json({ message: "Good ", body: req.body }).status(200);
  } catch (error) {
    console.warn("/api/timer/complete", error);
  }
});

module.exports = router;
