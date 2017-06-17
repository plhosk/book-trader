/* eslint-disable no-underscore-dangle */
const express = require('express')
const debug = require('debug')('api')
const validator = require('validator')
const fetch = require('isomorphic-fetch')
const Book = require('../schemas/book')

// const router = express.Router()
const router = express.Router({ mergeParams: true })

// root path /api/books

// If :bookId is found in path, fetch the book from database and attach to req.book
router.param('bookId', (req, res, next, bookId) => {
  debug(`Received API request for book ${bookId}`)
  Book.findOne({ bookId })
    .then((book) => {
      if (book === null) {
        return res.status(404).send({
          message: 'Book ID not found.',
        })
      }
      req.book = book
      return next()
    })
    .catch((err) => {
      // res.status(404).send(err)
      next(err)
    })
})

router.route('/:bookId')
  .get((req, res) => {
    debug('sending book')
    res.send(req.book.toJson()) // Already fetched book, just send it
  })
  .delete((req, res) => {
    if (!req.isAuthenticated() || !req.user || req.book.ownerId !== req.user._id) {
      return res.sendStatus(401)
    }
    req.book.deleted = true
    return req.book.save().then(() => {
      res.sendStatus(200)
    })
  })

router.route('/')
  .get((req, res, next) => {
    Book.find({
      deleted: false,
    })
      // .select('bookId title authors publishedDate thumbnail creationDate deleted')
      .sort('-creationDate')
      .then((bookList) => {
        res.status(200).json(bookList)
      })
      .catch((err) => {
        // res.status(400).send(err)
        next(err)
      })
  })
  .post((req, res, next) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.sendStatus(401)
    }
    debug(`add book request: ${req.body.isbn}`)
    const isbn = validator.whitelist(req.body.isbn, '\\[0-9\\]')
    debug(`cleaned isbn: ${isbn}`)
    if (!validator.isISBN(isbn)) {
      debug('Invalid ISBN')
      return res.status(400).send({ message: 'Invalid ISBN' })
    }
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    // return fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
      .then(response => response.json())
      .then((json) => {
        // debug(JSON.stringify(json, null, 2))
        if (json.totalItems === 0) {
          return res.status(404).send({
            message: 'Book not found, try a different ISBN',
          })
        }
        debug(`Book found: ${json.items[0].volumeInfo.title}`)
        const book = new Book()
        // const key = `ISBN:${isbn}`
        // book.title = json[key].title
        // book.author = json[key].authors[0].name
        // book.publishedDate = json[key].publish_date
        book.title = json.items[0].volumeInfo.title
        book.authors = [...json.items[0].volumeInfo.authors]
        book.publishedDate = json.items[0].volumeInfo.publishedDate
        // book.thumbnail = json.items[0].volumeInfo.imageLinks.thumbnail
        // use covers from openlibrary.org
        book.thumbnail = `https://covers.openlibrary.org/b/ISBN/${isbn}-M.jpg`
        book.ownerId = req.user._id // this is the database _id string
        return book.save()
          .then(() => {
            debug(book.toJson())
            return res.send(book.toJson())
          }) // run schema method to get book object
      })
      .catch((err) => {
        // res.status(400).send(err)
        next(err)
      })
  })

module.exports = router
