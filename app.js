const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require("body-parser");

const Util = require('./app/util')

let engine = require('ejs')
let app = express()
let port = 4200

let index = require('./routes/index')

// ----------------------------------------------------------
let cb = (err, result) => {
    if(err) { return console.error(err); }

    // if worker thread is still working
    if(result.isInProgress) {

    }
}

function cleanupWorker() {
    worker.postMessage('cleanup')
}

// Run data sender in a separate thread
let worker = Util.runWorker(path.join(__dirname, 'app/datasender.js'), cb)
process.on('SIGTERM', cleanupWorker)
process.on('SIGINT', cleanupWorker)
// ----------------------------------------------------

app.set('views', path.join(__dirname, 'views'))
// view engine setup
app.set('view engine', 'ejs')

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// Parsing Request body (JSON Parser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(logger('dev'))
//app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Route index
app.use('/', index)

// Disable cache
app.disable('view cache')

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
  
    // render the error page
    res.status(err.status || 500)
    res.render('pages/error')
})

app.use(express.json())

app.listen(port, () => {
    console.log('Serveur up, port ' + port)
})

module.exports = app