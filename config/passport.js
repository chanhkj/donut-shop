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
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, next) {
  // the authentication flow on our local authentication routes.

  User.findOne({
    'local.email': email
  }, function(err, foundUser) {
    // if user is found, don't create new user
    // if user is not found, create new user
    if (err) return next(err)

    if (foundUser) {
      return next(null, false, req.flash('signupMessage', 'Email has been taken'))
    } else {
      var newUser = new User({
        local: {
          email: email,
          password: password
        }
      })

      newUser.save(function(err, newUser) {
        if (err) throw err

        return next(null, newUser)
      })
// how to get the user create?

      User.create()

    }
  })
}))
