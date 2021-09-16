const usersRegistration = require('./UserRegistration')
const userLogin = require('./UserLogin')
const resetPassword = require('./ResetPassword');


module.exports = app => {
  app.use('/api/register', usersRegistration)
  app.use('/api/login', userLogin)
  app.use('/api/reset-password', resetPassword);
}