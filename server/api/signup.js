const express = require('express')

const router = express.Router()

const User = require('../models/user')

router.post('/', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  User.findOne({
    'local.username': username,
  }, (err, user) => {
    if (err) {
      return next(err)
    }
    if (user) {
      return res.status(400).send({
        success: false,
        message: 'registration failed',
      })
    }
    const newUser = new User({
      'local.username': username,
      'local.password': password,
    })
    newUser.save()
    return res.send({
      success: true,
      message: 'registration success',
    })
  })
})

module.exports = router
