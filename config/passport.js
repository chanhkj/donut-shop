var passport = require('passport')
// passport-local is for local authentication
var LocalStrategy = require('passport-local').Strategy

var User = require('../model/user')

passport.serielizeUser((user, done), function() {
  done(null, user.id)
})

passport.deserielizeUser((id, done), function() {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})
// passport.use is a 'passport' middleware, local-signup will be the
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, next) {
// the authentication flow on our local authentication routes.

}))
