const express = require('express')
const debug = require('debug')('api')
const User = require('../schemas/user')

const router = express.Router({ mergeParams: true })

router.param('userId', (req, res, next, userId) => {
  debug(`Received API request for user ${userId}`)
  User.findOne({ userId })
    .then((requestedUser) => {
      if (requestedUser === null) {
        return res.status(404).send({
          message: 'user not found. Try another ID',
        })
      }
      req.requestedUser = requestedUser
      return next()
    })
    .catch((err) => {
      // res.status(404).send(err)
      next(err)
    })
})

// Get user object of any user
router.route('/:userId')
  // View an offer
  .get((req, res) => {
    debug(`sending user object ${req.requestedUser.userId}`)
    debug(req.requestedUser.toJson())
    res.send(req.requestedUser.toJson()) // Already fetched offer, just send it
  })

  .put((req, res) => {
    debug(req.isAuthenticated, req.user.userId, req.body)
    if (!req.isAuthenticated() || req.user.userId !== req.body.userId) {
      return res.sendStatus(401)
    }
    req.requestedUser.displayName = req.body.displayName
    req.requestedUser.city = req.body.city
    req.requestedUser.country = req.body.country
    return req.requestedUser.save().then((savedUser) => {
      res.send(savedUser.toJson())
    })
  })

router.route('/')
  .get((req, res, next) => {
    User.find()
      .then((users) => {
        // const byId = {}
        // const allIds = []
        // users.forEach((element) => {
        //   byId[element.userId] = element.toJson()
        //   allIds.push(element.userId)
        // })
        // debug('Sending user list: ', { byId, allIds })
        // res.status(200).json({ byId, allIds })
        const userList = []
        users.forEach((element) => {
          userList.push(element.toJson())
        })
        debug('Sending user list: ', userList)
        res.status(200).json(userList)
      })
      .catch((err) => {
        // res.status(400).send(err)
        next(err)
      })
  })

module.exports = router
