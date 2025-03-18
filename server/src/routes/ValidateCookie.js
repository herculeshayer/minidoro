require("dotenv").config();
const express = require("express");
const router = express.Router();

const {
  checkCookie,
  validateAuthentication,
} = require("../middleware/validateCookie");

router.get("/", checkCookie, (req, res) => {
  try {
    if (req.cookies["access-token"]) {
      res.status(200).send("Valid Cookie");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
