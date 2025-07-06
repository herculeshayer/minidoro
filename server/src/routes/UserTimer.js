require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");

const { checkCookie } = require("../middleware/validateCookie");

router.get("/completed-pomodoro/day", checkCookie, async (req, res) => {
  try {
    const cookie = req.cookies["access-token"];
    const sessionDate = req.headers["date-iso"];

    const decodedJWT = jwt.decode(cookie);

    if ((decodedJWT.username || decodedJWT.email) === null) {
      res
        .json({
          message: "jwt token error, please login again",
          cookie: cookie,
        })
        .status(401);
    }

    const decodedUsername = decodedJWT.username;
    const decodedEmail = decodedJWT.email;

    const userDate = new Date(sessionDate);
    const dateOption = { dateStyle: "short" };

    const intlFormat = new Intl.DateTimeFormat("en-CA", dateOption).format(
      userDate
    );

    const query = `select pomodorocount from pomodoros p, users u where p.userid = u.userid and u.username = $1 and p.sessiondate = $2`;

    if (String(decodedUsername).length > 0 && String(decodedEmail).length > 0) {
      const q = await db.asyncQuery(query, [decodedUsername, intlFormat]);

      res
        .json({
          "message: ": "user info retrieved from database",
          sessiondate: intlFormat,
          completedPomodoros: q.rows,
        })
        .status(200);
    } else {
      res.json("message: ", "user/password issue").statusCode(401);
    }
  } catch (error) {
    console.warn("/api/timer/completed-pomodoro/day", error);
    res.json("Error Thrown: ", error);
  }
});

router.get("/completed-pomodoro/week", checkCookie, async (req, res) => {
  try {
    const cookie = req.cookies["access-token"];
    const sessionDate = req.headers["date-iso"];

    const userDate = new Date(sessionDate);
    const dateOptions = { dateStyle: "short" };
    const intlFormat = new Intl.DateTimeFormat("en-CA", dateOptions).format(
      userDate
    );

    const decodedJWT = jwt.decode(cookie);
    const user = decodedJWT.username;
    const email = decodedJWT.email;

    const query = `select
        pomodorocount,
        sessiondate
      from
        pomodoros p
      join users u on
        p.userid = u.userid
      where
        p.userid = u.userid
        and u.username = $1
        and p.sessiondate >= cast($2 as date) - interval '7 days';`;

    if (String(user).length > 0 && String(email).length > 0) {
      const q = await db.asyncQuery(query, [user, intlFormat]);
      res.json({
        "date: ": intlFormat,
        "decoded: ": decodedJWT,
        sessions: q.rows,
      });
    }
  } catch (error) {}
});

router.get("/completed-pomodoro/month", checkCookie, async (req, res) => {
  try {
    const cookie = req.cookies["access-token"];
    const sessionDate = req.headers["date-iso"];

    const decodedJWT = jwt.decode(cookie);
    const user = decodedJWT.username;
    const userEmail = decodedJWT.email;

    const userDate = new Date(sessionDate);
    const dateOptions = { dateStyle: "short" };
    const intlFormat = new Intl.DateTimeFormat("en-CA", dateOptions).format(
      userDate
    );

    const query = `
      select
        pomodorocount,
        sessiondate
      from
        pomodoros p
      join users u on
        p.userid = u.userid
      where
        p.userid = u.userid
        and u.username = $1
        and p.sessiondate >= cast($2 as date) - interval '30 days';`;

    if (String(user).length > 0 && String(userEmail).length > 0) {
      const q = await db.asyncQuery(query, [user, intlFormat]);

      res
        .json({
          date: intlFormat,
          user: user,
          email: userEmail,
          sessions: q.rows,
        })
        .status(200);
    } else {
      res.send("Error with User / Password").send(404);
    }
  } catch (error) {
    console.warn("Error: ", error);
    res.send("Error getting month data").status(500);
  }
});

router.get("/completed-pomodoro/year", checkCookie, async (req, res) => {
  try {
    const cookie = req.cookies["access-token"];
    const sessionDate = req.headers["date-iso"];

    const decodedJWT = jwt.decode(cookie);
    const user = decodedJWT.username;
    const userEmail = decodedJWT.email;

    const userDate = new Date(sessionDate);
    const dateOptions = { dateStyle: "short" };
    const intlFormat = new Intl.DateTimeFormat("en-CA", dateOptions).format(
      userDate
    );

    const query = `
      select
        pomodorocount,
        sessiondate
      from
        pomodoros p
      join users u on
        p.userid = u.userid
      where
        p.userid = u.userid
        and u.username = $1
        and p.sessiondate >= cast($2 as date) - interval '365 days';`;

    if (String(user).length > 0 && String(userEmail).length > 0) {
      const q = await db.asyncQuery(query, [user, intlFormat]);

      res
        .json({
          date: intlFormat,
          user: user,
          email: userEmail,
          sessions: q.rows,
        })
        .status(200);
    } else {
      res.send("Error with User / Password").send(404);
    }
  } catch (error) {
    console.warn("Error: ", error);
    res.send("Error getting year data").status(500);
  }
});

router.get("/completed-pomodoro/all", checkCookie, async (req, res) => {
  try {
    const cookie = req.cookies["access-token"];
    const sessionDate = req.headers["date-iso"];

    const decodedJWT = jwt.decode(cookie);
    const user = decodedJWT.username;
    const userEmail = decodedJWT.email;

    const userDate = new Date(sessionDate);
    const dateOptions = { dateStyle: "short" };
    const intlFormat = new Intl.DateTimeFormat("en-CA", dateOptions).format(
      userDate
    );

    const query = `
      select
        pomodorocount,
        sessiondate
      from
        pomodoros p
      join users u on
        p.userid = u.userid
      where
        p.userid = u.userid
        and u.username = $1;`;

    if (String(user).length > 0 && String(userEmail).length > 0) {
      const q = await db.asyncQuery(query, [user]);

      res
        .json({
          date: intlFormat,
          user: user,
          email: userEmail,
          sessions: q.rows,
        })
        .status(200);
    } else {
      res.send("Error with User / Password").send(404);
    }
  } catch (error) {
    console.warn("Error: ", error);
    res.send("Error getting year data").status(500);
  }
});

router.post("/completed-pomodoro", checkCookie, async (req, res) => {
  try {
    const cookie = req.cookies["access-token"];

    const sessionDate = req.headers["date-iso"];

    const sessionDateFormatIntl = new Date(sessionDate);
    const intlDateOptions = { dateStyle: "short" };
    const intlFormat = new Intl.DateTimeFormat("en-CA", intlDateOptions).format(
      sessionDateFormatIntl
    );

    const decodedJWT = jwt.decode(cookie);

    const jwtusername = decodedJWT.username;
    const jwtemail = decodedJWT.email;

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
      } else {
        console.log("A session does not exist for today");
        const s = await db.asyncQuery(createSessionWith_OnePomodoro, [
          intlFormat,
          jwtusername,
          jwtemail,
        ]);
      }
    }

    res.json({ message: "Good ", body: req.body }).status(200);
  } catch (error) {
    console.warn("/api/timer/complete", error);
    res.send("Error with creation").status(500);
  }
});

module.exports = router;
