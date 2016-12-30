/* eslint-disable prefer-arrow-callback, func-names */

const passport = require('passport')
const User = require('./models/user')

const LocalStrategy = require('passport-local').Strategy

passport.use('login', new LocalStrategy(function (username, password, done) {
  User.findOne({
    'local.username': username,
  }, function (errFind, user) {
    if (errFind) {
      return done(errFind)
    }
    if (!user) {
      return done(null, false, {
        message: 'No user has that username!',
      })
    }
    return user.validatePassword(password, function (errValidate, isMatch) {
      if (errValidate) {
        return done(errValidate)
      }
      if (isMatch) {
        return done(null, user)
      }
      return done(null, false, {
        message: 'Invalid password.',
      })
    })
  })
}))

const GitHubStrategy = require('passport-github2').Strategy

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
},
function (accessToken, refreshToken, profile, done) {
  // check user table for anyone with a github ID of profile.id
  User.findOne({
    'github.id': profile.id,
  }, function (errFind, user) {
    if (errFind) {
      return done(errFind)
    }
    // No user was found... so create a new user with values from GitHub (all the profile. stuff)
    if (!user) {
      user = new User({ // eslint-disable-line
        'github.username': profile.username,
        'github.id': profile.id,
      })
      return user.save(function (errSave) {
        if (errSave) {
          return done(errSave)
        }
        return done(errSave, user)
      })
    }
    // found user. Return
    return done(errFind, user)
  })
}))


module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id) //eslint-disable-line
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
