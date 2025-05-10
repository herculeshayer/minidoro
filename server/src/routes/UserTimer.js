const express = require("express");
const router = express.Router();

const { checkCookie } = require("../middleware/validateCookie");

router.get("/completed-pomodoro", checkCookie, async (req, res) => {});
router.post("/completed-pomodoro", checkCookie, async (req, res) => {});
