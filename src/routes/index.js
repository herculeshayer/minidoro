const usersRegistration = require('./UserRegistration')
const userLogin = require('./UserLogin')
// const photos = require('./photos')

module.exports = app => {
  app.use('/api/register', usersRegistration)
  app.use('/api/login', userLogin)
//   app.use('/api', )
//   app.use('/photos', photos)
  // etc..
}