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

router.route('/:userId')
  // View an offer
  .get((req, res) => {
    debug('sending requested user')
    res.send(req.requestedUser.toJson()) // Already fetched offer, just send it
  })

module.exports = router
