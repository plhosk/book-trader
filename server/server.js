require('dotenv').config()
const express = require('express')
const historyApiFallback = require('connect-history-api-fallback')
const path = require('path')
const favicon = require('serve-favicon')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
require('./passport')()

const app = express()
mongoose.Promise = require('bluebird')

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI)

app.use(favicon(path.join(__dirname, '/../public/favicon.ico')))

// console.log(`NODE_ENV=${process.env.NODE_ENV}`) //eslint-disable-line

app.set('port', process.env.PORT || 3000)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))

app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

const oneDay = 1000 * 60 * 60 * 24
function getStaticAssets() {
  return (process.env.NODE_ENV !== 'production')
    ? require('./hot-reload') // eslint-disable-line
    : express.static('public', { maxAge: oneDay })
}
app.use(getStaticAssets())
app.use('/', express.static('public', { maxAge: oneDay }))

// handle api paths here
app.use('/api/github', require('./api/github'))
app.use('/api/github/callback', require('./api/github'))
app.use('/api/signup', require('./api/signup'))
app.use('/api/login', require('./api/login'))
app.use('/api/logout', require('./api/logout'))
app.use('/api/books', require('./api/books'))
app.use('/api/offers', require('./api/offers'))
app.use('/api/users', require('./api/users'))

// // error handler
// app.use((err, req, res) => {
//   res.status(err.statusCode || 500).json(err)
// })

// Handle 404 (incl. client-side routes) by redirecting to index.html
app.use(historyApiFallback())
app.use(getStaticAssets())

app.listen(app.get('port'), () => {
  console.log('Server started on port ' + app.get('port')) // eslint-disable-line
})
