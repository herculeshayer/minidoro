require("dotenv").config();
const Router = require("express-promise-router");

const router = new Router();

router.get("/", (req, res) => {
  try {
    res.clearCookie("access-token", {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
      secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    });
    res.status(200).send("cleared cookie");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
