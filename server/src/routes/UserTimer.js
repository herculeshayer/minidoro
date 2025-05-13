require("dotenv").config();
const express = require("express");
const router = express.Router();

const { checkCookie } = require("../middleware/validateCookie");

router.get("/completed-pomodoro", checkCookie, async (req, res) => {
  try {
    const header = req.headers["access-token"];
    console.log("Request Header: ", header);

    if (false) {
      res.send("Not Found").status(204);
    } else {
      res.send("Good").status(200);
    }
  } catch (error) {
    console.warn("/api/timer/completed-pomodoro", error);
  }
});
router.post("/completed-pomodoro", checkCookie, async (req, res) => {
  try {
    const reqHeader = req.headers["access-token"];

    console.log("ReqHeader", reqHeader);

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
