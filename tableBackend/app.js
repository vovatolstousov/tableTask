const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const index = require('./routes/index')
const table = require('./routes/table')
const user = require('./routes/user')
const auth = require("./auth.js")();

const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/local', {useMongoClient: true})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('connected')
})
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(auth.initialize());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', index)
app.use('/table', table)
app.use('/users', user)
app.use((req, res, next) => next((new Error('Not Found')).status = 404))

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
