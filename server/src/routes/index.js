const usersRegistration = require("./UserRegistration");
const userLogin = require("./UserLogin");
const userLogout = require("./UserLogout");
const resetPassword = require("./ResetPassword");
const userDashboard = require("./UserDashboard");
const testCookies = require("./TestCookies");

module.exports = (app) => {
  app.use("/api/register", usersRegistration);
  app.use("/api/login", userLogin);
  app.use("/api/logout", userLogout);
  app.use("/api/reset-password", resetPassword);
  app.use("/api/dashboard", userDashboard);
  app.use("/api/validate-cookie", testCookies);
};
