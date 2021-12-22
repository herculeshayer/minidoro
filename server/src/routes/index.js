const usersRegistration = require('./UserRegistration')
const userLogin = require('./UserLogin')
const resetPassword = require('./ResetPassword');

const userData = require('./userData');


module.exports = app => {
  app.use('/api/register', usersRegistration)
  app.use('/api/login', userLogin)
  app.use('/api/reset-password', resetPassword);
  app.use('/api/userinfo', userData);
}