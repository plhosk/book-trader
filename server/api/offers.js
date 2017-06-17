/* eslint-disable no-underscore-dangle */
const express = require('express')
const debug = require('debug')('api')
const Offer = require('../schemas/offer')

// const router = express.Router()
const router = express.Router({ mergeParams: true })

// root path /api/offers

// If :offerId is found in path, fetch the offer from database and attach to req.offer
router.param('offerId', (req, res, next, offerId) => {
  debug(`Received API request for offer ${offerId}`)
  Offer.findOne({ offerId })
    .then((offer) => {
      if (offer === null) {
        return res.status(404).send({
          message: 'offer not found. Try another ID',
        })
      }
      req.offer = offer
      return next()
    })
    .catch((err) => {
      // res.status(404).send(err)
      next(err)
    })
})

router.route('/:offerId')
  // View an offer
  .get((req, res) => {
    debug('sending offer')
    res.send(req.offer.toJson()) // Already fetched offer, just send it
  })
  // Target accepts an offer
  .put((req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.sendStatus(401)
    }
    if (req.user.userId === req.offer.targetUserId) {
      req.offer.accepted = true
    } else {
      return res.sendStatus(401)
    }
    return req.offer.save().then(() => {
      res.sendStatus(200)
    })
  })
  // Originating cancels an offer, or target rejects an offer
  .delete((req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.sendStatus(401)
    }
    if (req.user.userId === req.offer.originatingUserId) {
      req.offer.cancelled = true
    } else if (req.user.userId === req.offer.targetUserId) {
      req.offer.rejected = true
    } else {
      return res.sendStatus(401)
    }
    req.offer.deleted = true
    return req.offer.save().then(() => {
      res.sendStatus(200)
    })
  })

router.route('/')

  // Get list of all offers pertaining to user (originating or target)
  .get((req, res, next) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.sendStatus(401)
    }
    return Offer.find({
      $or: [
        { originatingUserId: req.user.userId },
        { targetUserId: req.user.userId },
      ],
    })
      // .select('offerId originatingBookIds targetBookIds offerDate cancelled rejected accepted')
      .sort('-offerDate')
      .then((offerList) => {
        res.status(200).json(offerList)
      })
      .catch((err) => {
        // res.status(400).send(err)
        next(err)
      })
  })

  .post((req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401)
    }
    debug('add trade offer')
    const offer = new Offer()
    offer.originatingUserId = req.user.userId
    offer.targetUserId = req.body.targetUserId
    offer.originatingBookIds = [...req.body.originatingBookIds]
    offer.targetBookIds = [...req.body.originatingBookIds]
    return offer.save()
      .then(() => {
        debug(offer.toJson())
        return res.send(offer.toJson())
      }) // run schema method to get offer object
    .catch((err) => {
      // res.status(400).send(err)
      next(err)
    })
  })

module.exports = router
