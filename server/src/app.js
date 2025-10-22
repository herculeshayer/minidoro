require("dotenv").config();
const express = require("express");

const path = require("path");
const mountRoutes = require("./routes");
var app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set("trust proxy", 1);

const port = process.env.PORT || 3999;

const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: process.env.DOMAIN_ORIGIN,
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization", "date-iso"],
  })
);

app.get("/", (req, res) => {
  res.send("hi");
});

mountRoutes(app);

app.listen(port, () => console.log(`listening on ${port}`));
