const Koa = require('koa'),
    app = new Koa(),
    server = require('http').createServer(app.callback()),
    io = require('socket.io')(server),
    logger = require('../lib/log')('im'),
    db = require('../models/index'),
    crypto = require('crypto')


io.on('connection', function (socket) {
    var addedCustomer = false

    socket.on('new message from customer', async(data) => {

        try {
            await saveMessageToDB(socket.customerId, 'manager', data)
            socket
                .broadcast
                .emit('new message', {
                    username: socket.username,
                    message: data
                })
        } catch (error) {
            logger.error(error)
            socket.emit('socket error', error.message)
        }

    })

    socket.on('new message from manager', async(data) => {

        try {

            await saveMessageToDB(socket.customerId, 'manager', data)
            socket
                .broadcast
                .emit('new message', {
                    username: socket.username,
                    message: data
                })
        } catch (error) {
            logger.error(error)
            socket.emit('socket error', error.message)
        }

    })

    socket.on('manager login', async(data) => {
        let dbVal

        try {
            socket.userid = data.userid
            socket.username = data.username
            socket.customerId = data.customerId

            dbVal = await getHistory(socket.customerId)
            logger.info('------------------ manager login ------------------')
            logger.info(`${socket.username} -id: ${socket.userid}`)

            socket.emit('login succeed', dbVal)

        } catch (error) {
            logger.error(error)
            socket.emit('socket error', error.message)
        }
    })

    socket.on('autologin', async(data) => {
        let dbVal
        try {
            socket.userid = data.userid
            socket.username = data.username
            socket.customerId = data.userid

            dbVal = await getHistory(socket.customerId)

            if (!dbVal) {
                socket.emit('history delete')
                return
            }

            addedCustomer = true
            let result = {
                username: dbVal.customerName,
                userid: dbVal.customerId,
                history: dbVal.history
            }

            socket.emit('autologin succeed', result)
        } catch (error) {
            logger.error(error)
            socket.emit('socket error', error.message)
        }

    })

    socket.on('add customer', async(data) => {

        let dbVal, website, userid
        if (addedCustomer) {
            return
        }

        try {
            website = data.website
            userid = crypto.randomBytes(16).toString('hex')
            socket.username = data.username
            socket.userid = userid
            socket.customerId = userid

            if (!website) {
                throw Error('no WebsiteId')
            }

            if (!socket.username) {
                throw Error('no username')
            }

            dbVal = await new db.chatModel({
                website: website,
                customerId: userid,
                customerName: socket.username
            }).save()

            addedCustomer = true

            logger.info('------------------ add customer ------------------')
            logger.debug(`${socket.username} -id: ${userid}`)
            logger.debug(`website: ${website}`)

            socket
                .emit('login succeed', {
                    username: socket.username,
                    userid: socket.userid
                })

        } catch (error) {
            logger.error(error)
            socket.emit('socket error', error.message)
        }

    })

    socket.on('disconnect', function () {
        if (addedCustomer) {

            socket
                .broadcast
                .emit('user left', {
                    username: socket.username
                })
        }
    })

    socket.on('error', function (error) {
        logger.error(error)
    })
})

app.on('error', function (err, ctx) {
    logger.error('server error', err, ctx)
})

server.listen(8081, function () {
    logger.info('Server listening at port 8081')
})


async function saveMessageToDB(customerId, from, message) {
    return await db.chatModel.update({
        customerId: customerId
    }, {
        $push: {
            'history': {
                from: from,
                message: message,
                time: Date.now,
                answer: false
            }
        }
    }).exec()
}

async function getHistory(id) {
    return await db.chatModel.findOne({
        customerId: id
    }, {
        customerName: 1,
        customerId: 1,
        history: 1,
        _id: -1
    }).exec()
}
