/* eslint-disable no-underscore-dangle */
const express = require('express')
const passport = require('passport')

const router = express.Router()

router.route('/')
  .post((req, res, next) => {
    passport.authenticate('login', (errAuth, user) => {
      if (errAuth) {
        return next(errAuth)
      }
      if (!user) {
        // username not found
        return res.status(401).send({
          message: 'authentication failed',
        })
      }
      return req.login(user, (errLogin) => {
        if (errLogin) {
          return next(errLogin)
        }
        // login successful. send user info
        return res.send({
          id: user._id,
          username: user.name(),
        })
      })
    })(req, res, next)
  })

  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.send({
        id: req.user._id,
        username: req.user.name(),
      })
    } else {
      res.status(204).send({
        message: 'User not authenticated.',
      }) // user not authenticated. send 204 (no content)
    }
  })

module.exports = router
