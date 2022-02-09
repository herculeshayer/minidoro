const usersRegistration = require('./UserRegistration')
const userLogin = require('./UserLogin')
const resetPassword = require('./ResetPassword');
const userDashboard = require('./userDashboard');
const testCookies = require('./testCookies');

module.exports = app => {
  app.use('/api/register', usersRegistration)
  app.use('/api/login', userLogin)
  app.use('/api/reset-password', resetPassword)
  app.use('/api/dashboard', userDashboard)
  app.use('/api/testcookie', testCookies)
}