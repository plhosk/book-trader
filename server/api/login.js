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
        return res.sendStatus(401)
      }
      return req.login(user, (errLogin) => {
        if (errLogin) {
          return next(errLogin)
        }
        // login successful. send user info
        // return res.send({
        //   // id: user._id,
        //   userId: user.userId,
        //   username: user.name(),
        // })
        return res.send(user.toJson())
      })
    })(req, res, next)
  })

  // Get user object of requesting authenticated user
  .get((req, res) => {
    if (req.isAuthenticated()) {
      // res.send({
      //   // id: req.user._id,
      //   userId: req.user.userId,
      //   username: req.user.name(),
      // })
      res.send(req.user.toJson())
    } else {
      res.sendStatus(204) // user not authenticated. send 204 (no content)
    }
  })

module.exports = router
