var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')

// var bcrypt = require('bcrypt')
var session = require('express-session')
var flash = require('connect-flash')

var passport = require('passport')

var dotenv = require('dotenv')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

// load environment variables from .env file, where API keys and passwords are configured.

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)
// below is replaced with dotenv
// if (process.env.NODE_ENV === 'production') {
//   mongoose.connect('mongodb://chanhkj:John2010@ds061506.mlab.com:61506/donut-shop')
// } else {
//   mongoose.connect('mongodb://localhost/donut-shop')
// }

app.set('view engine', 'ejs')
app.use(layout)
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// serve static files
app.use(express.static(__dirname + '/public'))

var frontendRoutes = require('./routes/donuts')
var ajaxRoutes = require('./routes/donuts_api')

var usersRoutes = require('./routes/users')
var usersAPIRoutes = require('./routes/users_api')

app.use(bodyParser.json()) // to parse ajax json req
app.use(bodyParser.urlencoded({
  extended: true
})) // to parse form submitted data

app.use('/donuts', frontendRoutes) // only render ejs files
app.use('/api/donuts', ajaxRoutes) // only handle ajax request

app.use('/', usersRoutes)
app.use('/api/users', usersAPIRoutes)

app.listen(process.env.PORT || 3000)
console.log('Server started')
