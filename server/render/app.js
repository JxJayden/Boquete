const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')()
const logger = require('../lib/log')('app')
const http = require('http')
const port = normalizePort(process.env.PORT || '8080')
const server = http.createServer(app.callback())
const io = require('socket.io')(server)
const index = require('./routes/index')

// error handler
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

onerror(app)

// middlewares
app
    .use(bodyparser)
    .use(json())
    .use(require('koa-static')(__dirname + '/public'))
    .use(views(__dirname + '/views', {
        extension: 'pug'
    }))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

let numUsers = 0

io.on('connection', function (socket) {
    var addedUser = false

    socket.on('new message', function (data) {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        })
    })

    socket.on('add user', function (username) {
        if (addedUser) return

        socket.username = username; // eslint-disable-line
        ++numUsers
        addedUser = true
        socket.emit('login', {
            numUsers: numUsers
        })

        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        })
    })

    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            username: socket.username
        })
    })

    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        })
    })

  // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers

            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            })
        }
    })
})


function normalizePort(val) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    switch (error.code) {
    case 'EACCES':
        logger.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
    case 'EADDRINUSE':
        logger.error(bind + ' is already in use')
        process.exit(1)
        break
    default:
        throw error
    }
}


function onListening() {
    const addr = server.address()
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    logger.info('Listening on ' + bind)
}

